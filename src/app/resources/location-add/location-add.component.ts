import { LocationService } from './../../app-services/resources/location.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Location } from 'src/app/app-models/resources';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
frm!: FormGroup;
isCheckingName = this.locationService.isCkeckingName();
newOrUpdate = this.model ? `#${this.model.Id} Edit` : 'New Location';
  constructor(@Inject(MAT_DIALOG_DATA) private model: Location,
              private locationService:LocationService,
              private dialogRef: MatDialogRef<LocationAddComponent>) { }

  ngOnInit(): void {
    this.frm = this.locationService.createForm(this.model);
  }
  onSubmit():void {
    if(this.frm.invalid) {
      return;
    }
    this.dialogRef.close(this.frm.value);
  }

}
