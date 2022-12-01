import { SwapRequestAddComponent } from './swap-request-add/swap-request-add.component';
import { SwapRequestListComponent } from './swap-request-list/swap-request-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: SwapRequestListComponent},
  {path: 'add', component: SwapRequestAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwapRequestsRoutingModule { }
