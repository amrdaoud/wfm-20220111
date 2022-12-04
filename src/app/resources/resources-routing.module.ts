import { SublocationListComponent } from './sublocation-list/sublocation-list.component';
import { HeadOfSectionListComponent } from './head-of-section-list/head-of-section-list.component';
import { LocationListComponent } from './location-list/location-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffMembersListComponent } from './staff-members-list/staff-members-list.component';
import { StaffMemberAddComponent } from './staff-member-add/staff-member-add.component';
import { StaffTypeListComponent } from './staff-type-list/staff-type-list.component';
import { TransportationListComponent } from './transportation-list/transportation-list.component';
import { AuthGuard } from '../app-guards/auth.guard';

const routes: Routes = [
  {path: 'locations', component: LocationListComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  {path: 'sublocations', component: SublocationListComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  {path: 'staff-members', component: StaffMembersListComponent , data:{Roles: ['Admin','Hos']}, canActivate: [AuthGuard]},
  {path: 'staff-members/add', component: StaffMemberAddComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  {path: 'staff-members/:id', component: StaffMemberAddComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  {path: 'staff-types', component: StaffTypeListComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  {path: 'transportations', component: TransportationListComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  {path: 'head-of-sections', component: HeadOfSectionListComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourcesRoutingModule { }
