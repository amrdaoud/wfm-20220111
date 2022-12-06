import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable } from 'rxjs';
import { AttendanceApprovalModel, AttendanceType, DayOption, UserChoice } from 'src/app/app-models/day-offs';
import { SubLocation, Transportation } from 'src/app/app-models/resources';
import { weekDays } from 'src/app/app-models/shared/dictionaries';
import { Shift } from 'src/app/app-models/ShiftsAndActivities';
import { DayOffService } from 'src/app/app-services/day-offs/day-off.service';
import { ShiftService } from 'src/app/app-services/shifts-and-activities/shift.service';

@Component({
  selector: 'app-admin-need-approval',
  templateUrl: './admin-need-approval.component.html',
  styleUrls: ['./admin-need-approval.component.css']
})
export class AdminNeedApprovalComponent implements AfterViewInit {
  filterControl = new FormControl();
  weekDays = weekDays;
  dataSource = new MatTableDataSource<UserChoice>();
  @Input() data = new Observable<UserChoice[]>();
  @Input() isLoading = new Observable<boolean>();
  @Input() shiftsObservable = new Observable<Transportation[]>();
  @Input() isLoadingShifts = new Observable<boolean>();
  @Input() sublocationsObservable = new Observable<SubLocation[]>();
  @Input() attendanceTypesObservable = new Observable<AttendanceType[]>();
  @Input() isLoadingTypes = new Observable<boolean>();
  inEditItem!: UserChoice | null;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() approved = new EventEmitter<AttendanceApprovalModel>();
  @Input() loadingApproveItems! :Observable<number[]>;
  columns = ['ScheduleName','StaffMemberName','AttendenceTypeName', 'ShiftName', 'UserChoices', 'edit'];
  frm = new FormGroup({
    AccepedDayOffInfo : new FormGroup({})
  });
  constructor(private dayOffService: DayOffService,
              private shiftService: ShiftService) { }

  ngAfterViewInit(): void {
    this.data.subscribe(result => {
      this.dataSource = new MatTableDataSource<UserChoice>(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editView(row: UserChoice) {
    this.frm = this.dayOffService.createApprovalForm(row);
    this.inEditItem = row;
  }
  stopEditing() {
    this.frm = new FormGroup({
      AccepedDayOffInfo : new FormGroup({})
    });
    this.inEditItem = null;
  }

  selectAdminDays(event: MatSelectChange) {
    const val = event.value as Array<string>;
    if(val?.length === 2) {
      (event.source as MatSelect).options.forEach(option => {
        if(!option.selected) {
          option.disabled = true;
        }
      });
      (event.source as MatSelect).close();
      this.frm.get('AccepedDayOffInfo')?.setValue({Id: 0, Day1: val[0], Day2: val[1]})
      return;
    }
    else {
      (event.source as MatSelect).options.forEach(option => {
        option.disabled = false;
      })
    }
  }
  changeDays(dayOption: DayOption) {
    this.frm?.get('AccepedDayOffInfo')?.patchValue({Id: dayOption.Id, Day1: dayOption.Days[0], Day2: dayOption.Days[1]});
  }
  get formDays(): string {
    if(!this.frm.get('AccepedDayOffInfo')?.value?.Day1) {
      return ''
    }
    return this.frm.get('AccepedDayOffInfo')?.value.Day1 + ',' + this.frm.get('AccepedDayOffInfo')?.value.Day2;
  }
  onSubmit() {
    this.approved.emit(this.frm.value);
    this.stopEditing();
  }

}
