import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffType } from 'src/app/app-models/resources';
import { StaffTypeService } from 'src/app/app-services/resources/staff-type.service';

@Component({
  selector: 'app-staff-type-add',
  templateUrl: './staff-type-add.component.html',
  styleUrls: ['./staff-type-add.component.css']
})
export class StaffTypeAddComponent implements OnInit {
  frm!: FormGroup;
  isCheckingName = this.staffTypeService.isCkeckingName();
  constructor(@Inject(MAT_DIALOG_DATA) private model: StaffType,
              private staffTypeService:StaffTypeService,
              private dialogRef: MatDialogRef<StaffTypeAddComponent>) { }

  ngOnInit(): void {
    this.frm = this.staffTypeService.createForm(this.model);
  }
  onSubmit():void {
    if(this.frm.invalid) {
      return;
    }
    this.dialogRef.close(this.frm.value);
  }

}
