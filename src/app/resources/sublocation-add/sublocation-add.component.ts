import { LocationService } from './../../app-services/resources/location.service';
import { SubLocation } from './../../app-models/resources';
import { SublocationService } from './../../app-services/resources/sublocation.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sublocation-add',
  templateUrl: './sublocation-add.component.html',
  styleUrls: ['./sublocation-add.component.css']
})
export class SublocationAddComponent implements OnInit {
  frm!: FormGroup;
  isCheckingName = this.sublocationService.isCkeckingName();
  locations = this.locationService.locations();
  isLoadingLocations = this.locationService.status();
  newOrUpdate = this.model ? `#${this.model.Id} Edit` : 'New Location';
    constructor(@Inject(MAT_DIALOG_DATA) private model: SubLocation,
                private sublocationService:SublocationService,
                private locationService: LocationService,
                private dialogRef: MatDialogRef<SublocationAddComponent>) { }

    ngOnInit(): void {
      this.frm = this.sublocationService.createForm(this.model);
    }
    onSubmit():void {
      if(this.frm.invalid) {
        return;
      }
      this.dialogRef.close(this.frm.value);
    }

  }
