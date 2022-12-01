import { environment } from 'src/environments/environment';
import { ThemeService } from './app-services/theme.service';
import { ConfigService } from './app-services/configurations/config.service';
import { ScheduleService } from 'src/app/app-services/schedules/schedule.service';
import { Component, OnInit } from '@angular/core';
import { NavItem } from './app-models/shared/nav-item';
import { DayOffService } from './app-services/day-offs/day-off.service';
import { InitialService } from './app-services/root-services/initial.service';
import { AppUser } from './app-models/root-models/app-user';
import { Observable, tap } from 'rxjs';
import { NavItemService } from './app-services/root-services/nav-item.service';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoadingDayOff = this.dayOffService.creatingStatus();
  isLoadingGenerate = this.scheduleService.statusGenerating();
  isLoadingInitial = this.initialService.status;
  isLoadingSchedule = this.initialService.statusSchedule;
  user!: Observable<AppUser>;
  title = 'wfm-20220111';
  navItems: NavItem[] = [];
  theme: string = 'default';
  tenant = environment.tenant;
  constructor(private dayOffService: DayOffService,
              private scheduleService: ScheduleService,
              private initialService: InitialService,
              private navItemService: NavItemService,
              private config: ConfigService,
              private themeService: ThemeService,
              private overlayContainer: OverlayContainer){}
  ngOnInit(): void {
      this.user = this.initialService.user.pipe(
        tap(user => {
          this.navItems = this.navItemService.getNavItems(user);
        })
      )
    this.themeService.selectedTheme.subscribe(t => {
      this.theme = t;
      this.changeOverlayTheme(t);
    });
  }

  changePretend(newPretend: string) {
    this.config.updatePretend(newPretend);
    this.scheduleService.getAll();
    this.initialService.changeUserName(newPretend);
  }
  changeOverlayTheme(t: string): void {
    if(t === 'dark') {
      this.overlayContainer.getContainerElement().classList.remove('default');
      this.overlayContainer.getContainerElement().classList.add(t);
    }
    else {
      this.overlayContainer.getContainerElement().classList.remove('dark');
      this.overlayContainer.getContainerElement().classList.add(t);
    }
  }

}
