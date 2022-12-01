import { ShiftService } from './../../app-services/shifts-and-activities/shift.service';
import { Shift } from './../../app-models/ShiftsAndActivities';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shift-add',
  templateUrl: './shift-add.component.html',
  styleUrls: ['./shift-add.component.css']
})
export class ShiftAddComponent implements OnInit {
frm = this.shiftService.createForm(this.model);
isCheckingName = this.shiftService.isCheckingName;
newOrUpdate = this.model ? `#${this.model.Id} Edit` : 'New Shift';
  constructor(@Inject(MAT_DIALOG_DATA) private model: Shift,
              private shiftService: ShiftService,
              private dialogRef: MatDialogRef<ShiftAddComponent>) { }

  ngOnInit(): void {
  }
  onSubmit():void {
    if(this.frm.invalid) {
      return;
    }
    this.dialogRef.close(this.frm.value);
  }

}
