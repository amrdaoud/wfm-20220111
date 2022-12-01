import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { exhaustMap, filter } from 'rxjs';
import { UploadData } from 'src/app/app-models/day-offs';
import { weekDays } from 'src/app/app-models/shared/dictionaries';
import { DayOffService } from 'src/app/app-services/day-offs/day-off.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';
import { ErrorService } from 'src/app/app-services/shared/error.service';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {
  dataSource = new MatTableDataSource<UploadData>();
  columns = ['EmployeeId', 'Transportation', 'Attendance', 'DayOne', 'DayTwo']
  isValid = false;
  isLoading = this.dayOffService.status();
  constructor(private dayOffService: DayOffService,
              private confirm: ConfirmService,
              private snackBar: MatSnackBar,
              private errorService: ErrorService) { }

  ngOnInit(): void {
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
      let data = utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) as Array<UploadData>;
      this.isValid = true;
      data.forEach(element => {
        if(
          !element.EmployeeId ||
          data.filter(x => x.EmployeeId === element.EmployeeId).length > 1 ||
          !element.Attendance ||
          !element.Transportation ||
          !element.DayOne ||
          !element.DayTwo ||
          !weekDays.includes(element.DayOne) ||
          !weekDays.includes(element.DayTwo) ||
          element.DayOne.toLowerCase() == element.DayTwo.toLocaleLowerCase()) {
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
    this.confirm.open('All Day-Offs & Break Types of this schedule will be replaced. Proceed?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.dayOffService.uploadDayOffWithBreaks(this.dataSource.data);
      })
    ).subscribe(x => {
      if(x) {
        this.snackBar.open('Data Uploaded', 'Dismiss', {duration: 2000})
      }
    })
  }

}
