import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { exhaustMap, filter } from 'rxjs';
import { getDaysBetweenString } from 'src/app/app-helpers/date-helper';
import { UploadDataGuard } from 'src/app/app-models/day-offs';
import { weekDays } from 'src/app/app-models/shared/dictionaries';
import { AttendancePatternService } from 'src/app/app-services/attendance-pattern.service';
import { ScheduleService } from 'src/app/app-services/schedules/schedule.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';
import { ErrorService } from 'src/app/app-services/shared/error.service';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-attendance-pattern-upload',
  templateUrl: './attendance-pattern-upload.component.html',
  styleUrls: ['./attendance-pattern-upload.component.scss']
})
export class AttendancePatternUploadComponent implements OnInit {
  dataSource = new MatTableDataSource<UploadDataGuard>();
  columns = ['EmployeeId','Sublocation', 'Transportation', 'DayOffs'];
  isValid = false;
  isLoading = this.patternService.isLoading;
  scheduleDays: string[] = [];
  constructor(private patternService: AttendancePatternService,
              private confirm: ConfirmService,
              private snackBar: MatSnackBar,
              private errorService: ErrorService,
              private router: Router,
              private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.scheduleService.getUnpublished().subscribe(x => {
      this.scheduleDays = getDaysBetweenString(x.Schedule.StartDate, x.Schedule.EndDate);
    })
  }
  uploadFile(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    if(!(selectedFile.name as string).endsWith('.xls') && !(selectedFile.name as string).endsWith('.xlsx')) {
      this.errorService.open(101, 'File type must be .xls or .xlsx');
      return;
    }
    if(selectedFile.size > 100000) {
      this.errorService.open(102, 'Maximum file size is 100KB');
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event: any) => {
      let binaryData = event.target.result;
      let workbook = read(binaryData, {type:'binary'});
      let data = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as Array<UploadDataGuard>;
      this.isValid = true;
      data.forEach(element => {
        if(
          !element.EmployeeId ||
          data.filter(x => x.EmployeeId === element.EmployeeId).length > 1 ||
          !element.Sublocation ||
          !element.Shift ||
          !element.DayOffs ||
          !this.scheduleDays.find(x => element.DayOffs.split(',').includes(x))){
            element.Valid = false;
            this.isValid = false;
          }
          else {
            element.Valid = true;
          }

      });
      this.dataSource.data = data;
    }
  }
  submit() {
    this.confirm.open('All daily attendance pattern of this schedule will be replaced. Proceed?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.patternService.uplaodPatterns(this.dataSource.data);
      })
    ).subscribe(x => {
      if(x) {
        this.snackBar.open('Data Uploaded', 'Dismiss', {duration: 2000});
        this.router.navigateByUrl('/pre-schedule')
      }
    })
  }

}
