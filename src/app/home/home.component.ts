import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { InitialService } from '../app-services/root-services/initial.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentSchedule = this.initialService.currentSchedule;
  isAdmin = this.initialService.inRoles(['Admin']);
  isHos = this.initialService.inRoles(['Hos']);
  showForecast = environment.tenant === 'Call Center';
  constructor(private initialService: InitialService) { }

  ngOnInit(): void {
  }

}
