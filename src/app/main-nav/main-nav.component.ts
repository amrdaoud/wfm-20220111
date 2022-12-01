import { ThemeService } from './../app-services/theme.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavItem } from '../app-models/shared/nav-item';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
@Input() navItems: NavItem[] = [];
@Input() alias!: string | undefined;
@Input() avatarUrl!: string | undefined;
@Input() roles!: string[] | undefined;
@Input() tenant = '';
@Output() pretendChanged = new EventEmitter<string>();
  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {

  }
  changePretend(newPretend: string) {
    this.pretendChanged.emit(newPretend);
  }
  changeTheme(theme: string) {
    this.themeService.setTheme(theme)
  }

}
