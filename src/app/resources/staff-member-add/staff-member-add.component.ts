import { HeadOfSectionService } from './../../app-services/resources/head-of-section.service';
import { genders, languages, religions } from './../../app-models/shared/dictionaries';
import { TransportationService } from 'src/app/app-services/resources/transportation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Location, StaffMember } from 'src/app/app-models/resources';
import { LocationService } from 'src/app/app-services/resources/location.service';
import { StaffMemberService } from 'src/app/app-services/resources/staff-member.service';
import { StaffTypeService } from 'src/app/app-services/resources/staff-type.service';

@Component({
  selector: 'app-staff-member-add',
  templateUrl: './staff-member-add.component.html',
  styleUrls: ['./staff-member-add.component.css']
})
export class StaffMemberAddComponent implements OnInit {
frm!: FormGroup;
genders = genders;
languages= languages;
religions= religions;
locationsObservable = this.locationService.locations();
isLoadingLocations = this.locationService.status();
typesObservable = this.staffTypeService.staffTypes();
isLoadingTypes = this.locationService.status();
transportationsObservable = this.transportationService.transportations();
isLoadingTransportations = this.transportationService.status();
headsObservable = this.headService.headOfSections();
isLoadingHeads = this.headService.status();
isLoading = this.staffMemberService.status();
isCheckingEmployeeId = this.staffMemberService.isCheckingEmployeeId;
isCheckingName = this.staffMemberService.isCheckingName;
isCheckingAlias = this.staffMemberService.isCheckingAlias;
isCheckingEmail = this.staffMemberService.isCheckingEmail;
staffMember!: StaffMember;
  constructor(private staffMemberService:StaffMemberService,
              private route: ActivatedRoute,
              private locationService: LocationService,
              private staffTypeService: StaffTypeService,
              private transportationService: TransportationService,
              private headService: HeadOfSectionService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap((paramMap: ParamMap) => {
        const id = Number(paramMap.get('id'));
        if(id) {

          return this.staffMemberService.getById(+id);
        }
        return of(null);
      })
    ).subscribe(staff => {
      this.frm = this.staffMemberService.createForm(staff!);
      this.staffMember = staff!;
    })

  }
  onSubmit(): void {
    if(this.frm.invalid) {
      return;
    }
    if(this.staffMember) {
      this.staffMemberService.edit(this.staffMember.Id,this.frm.value).subscribe(() => this.router.navigateByUrl('resources/staff-members'))
    }
    else {
      this.staffMemberService.add(this.frm.value).subscribe(() => this.router.navigateByUrl('resources/staff-members'));
    }
  }
  reset() {
    this.frm = this.staffMemberService.createForm(this.staffMember)
  }

}
