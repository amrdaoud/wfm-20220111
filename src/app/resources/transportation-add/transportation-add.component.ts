import { LocationService } from './../../app-services/resources/location.service';
import { TransportationService } from './../../app-services/resources/transportation.service';
import { Transportation } from './../../app-models/resources';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-transportation-add',
  templateUrl: './transportation-add.component.html',
  styleUrls: ['./transportation-add.component.css']
})
export class TransportationAddComponent implements OnInit {
  frm!: FormGroup;
  locations = this.locationService.locations();
  isLoadingLocations = this.locationService.status();
  isCheckingName = this.transportationService.isCkeckingName();
  newOrUpdate = this.model ? `#${this.model.Id} Edit` : 'New Transportation';
  constructor(@Inject(MAT_DIALOG_DATA) private model: Transportation,
              private transportationService:TransportationService,
              private dialogRef: MatDialogRef<TransportationAddComponent>,
              private locationService: LocationService) { }

  ngOnInit(): void {
    this.frm = this.transportationService.createForm(this.model);
  }

  onSubmit():void {
    if(this.frm.invalid) {
      return;
    }
    this.dialogRef.close(this.frm.value);
  }

}
