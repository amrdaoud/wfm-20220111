import { SublocationService } from './../../app-services/resources/sublocation.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Transportation } from 'src/app/app-models/resources';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransportationService } from 'src/app/app-services/resources/transportation.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transportation-guard-add',
  templateUrl: './transportation-guard-add.component.html',
  styleUrls: ['./transportation-guard-add.component.css']
})
export class TransportationGuardAddComponent implements OnInit {
  frm!: FormGroup;
  subLocations = this.subLocationService.subLocations();
  isLoadingSublocations = this.subLocationService.status();
  newOrUpdate = this.model ? `#${this.model.Id} Edit` : 'New Transportation';
  constructor(private subLocationService: SublocationService,
              @Inject(MAT_DIALOG_DATA) private model: Transportation,
              private transportationService:TransportationService,
              private dialogRef: MatDialogRef<TransportationGuardAddComponent>) { }

  ngOnInit(): void {
    this.frm = this.transportationService.createFormGuard(this.model);
  }
  onSubmit():void {
    if(this.frm.invalid) {
      return;
    }
    this.dialogRef.close(this.frm.value);
  }

}
