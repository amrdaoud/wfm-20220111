import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceType, attendanceTypeColumns } from 'src/app/app-models/attendance-types';
import { AttendanceTypeService } from 'src/app/app-services/shifts-and-activities/attendance-type.service';
import { AttendanceTypeAddComponent } from '../attendance-type-add/attendance-type-add.component';

@Component({
  selector: 'app-attendance-type-list',
  templateUrl: './attendance-type-list.component.html',
  styleUrls: ['./attendance-type-list.component.css']
})
export class AttendanceTypeListComponent implements OnInit {

  observableData = this.attendanceTypeService.attendanceTypes;
  isLoading = this.attendanceTypeService.status;
  columnsDef = attendanceTypeColumns;
  constructor(private attendanceTypeService: AttendanceTypeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openType(model?: AttendanceType) {
    this.dialog.open(AttendanceTypeAddComponent, {panelClass: 'add-dialog', disableClose: true, data: model})
    .afterClosed().subscribe(result => {
      if(result) {
        if(model) {
          this.attendanceTypeService.edit(model.Id, result);
        }
        else {
          this.attendanceTypeService.add(result);
        }
      }
    })
  }

}
