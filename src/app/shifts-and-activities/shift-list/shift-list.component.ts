import { ShiftAddComponent } from './../shift-add/shift-add.component';
import { Shift } from './../../app-models/ShiftsAndActivities';

import { ShiftService } from './../../app-services/shifts-and-activities/shift.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { shiftColumns } from 'src/app/app-models/ShiftsAndActivities';

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
export class ShiftListComponent implements OnInit {
  observableData = this.shiftService.shifts();
  isLoading = this.shiftService.status();
  columnsDef = shiftColumns;
  constructor(private shiftService: ShiftService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openShift(model?: Shift) {
    this.dialog.open(ShiftAddComponent, {panelClass: 'add-dialog', disableClose: true, data: model})
    .afterClosed().subscribe(result => {
      if(result) {
        if(model) {
          this.shiftService.edit(model.Id, result);
        }
        else {
          this.shiftService.add(result);
        }
      }
    })
  }

}
