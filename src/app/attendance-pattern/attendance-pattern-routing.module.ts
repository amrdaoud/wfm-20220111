import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendancePatternListComponent } from './attendance-pattern-list/attendance-pattern-list.component';
import { AttendancePatternUploadComponent } from './attendance-pattern-upload/attendance-pattern-upload.component';

const routes: Routes = [
  {path: '', component: AttendancePatternListComponent},
  {path: 'upload', component: AttendancePatternUploadComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendancePatternRoutingModule { }
