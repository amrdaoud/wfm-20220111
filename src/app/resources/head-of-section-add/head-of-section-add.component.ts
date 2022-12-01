import { HeadOfSection } from './../../app-models/resources';
import { HeadOfSectionService } from './../../app-services/resources/head-of-section.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from 'src/app/app-services/resources/location.service';
import { genders, languages } from 'src/app/app-models/shared/dictionaries';

@Component({
  selector: 'app-head-of-section-add',
  templateUrl: './head-of-section-add.component.html',
  styleUrls: ['./head-of-section-add.component.css']
})
export class HeadOfSectionAddComponent implements OnInit {
  genders = genders;
  languages= languages;
  frm = this.headService.createForm(this.model);
  locations = this.locationService.locations();
  isLoadingLocations = this.locationService.status();
  isCheckingEmployeeId = this.headService.isCheckingEmployeeId;
  isCheckingName = this.headService.isCheckingName;
  isCheckingAlias = this.headService.isCheckingAlias;
  isCheckingEmail = this.headService.isCheckingEmail;
  newOrUpdate = this.model ? `#${this.model.Id} Edit` : 'New Head Of Section';
  constructor(@Inject(MAT_DIALOG_DATA) private model: HeadOfSection,
              private headService:HeadOfSectionService,
              private dialogRef: MatDialogRef<HeadOfSectionAddComponent>,
              private locationService: LocationService) { }

  ngOnInit(): void {
  }
  onSubmit():void {
    if(this.frm.invalid) {
      return;
    }
    this.dialogRef.close(this.frm.value);
  }

}
