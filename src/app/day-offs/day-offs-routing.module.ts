import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app-guards/auth.guard';
import { AdminApprovalListComponent } from './admin-approval-list/admin-approval-list.component';
import { UploadComponent } from './upload/upload.component';
import { UserChoiceComponent } from './user-choice/user-choice.component';

const routes: Routes = [
  {path: 'attendance-approvals', component: AdminApprovalListComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]},
  {path: 'attendance-choices', component: UserChoiceComponent , data:{Roles: ['User']}, canActivate: [AuthGuard]},
  {path: 'upload', component: UploadComponent , data:{Roles: ['Admin']}, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DayOffsRoutingModule { }
