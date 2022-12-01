import { ForecastListComponent } from './forecast-list/forecast-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForecastAddComponent } from './forecast-add/forecast-add.component';

const routes: Routes = [
  {path:'', component:ForecastListComponent},
  {path:'add', component: ForecastAddComponent},
  {path:':id', component: ForecastAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForecastsRoutingModule { }
