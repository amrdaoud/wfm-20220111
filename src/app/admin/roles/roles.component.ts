import { AdUsersComponent } from './../ad-users/ad-users.component';
import { AdGroupsComponent } from './../ad-groups/ad-groups.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, filter, switchMap, tap } from 'rxjs';
import { AppRolesMapping } from 'src/app/app-models/root-models/app-user';
import { ConfigService } from 'src/app/app-services/configurations/config.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
rolesMapping!: AppRolesMapping;
  constructor(private configService: ConfigService,
              private snackBar: MatSnackBar,
              private confirm: ConfirmService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.configService.getRolesMapping().subscribe(result => {
      this.rolesMapping = result;
    })
  }
  save(): void {
    this.confirm.open('Are you sure you want to save?').pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.configService.setRolesMapping(this.rolesMapping)
      })
    ).subscribe(result => {
      if(result) {
        this.snackBar.open('Configuration Saved', 'dismiss', {duration: 2000})
      }
    })
  }
  openAddGroup() {
    this.dialog.open(AdGroupsComponent, {panelClass:'active-directory'}).afterClosed().subscribe(
      (x: {Role: string, Groups: string[]}) => {
        if(x) {
          if(x.Role === 'Admin') {
            this.rolesMapping.Groups.Admin.push(...x.Groups.filter(x => !this.rolesMapping.Groups.Admin.includes(x)))
          } else if(x.Role === 'Hos') {
            this.rolesMapping.Groups.Hos.push(...x.Groups.filter(x => !this.rolesMapping.Groups.Hos.includes(x)))
          } else if(x.Role === 'User') {
            this.rolesMapping.Groups.User.push(...x.Groups.filter(x => !this.rolesMapping.Groups.User.includes(x)))
          }
        }
      }
    )
    // this.rolesMapping.Groups.Admin.push('New Group Test')
  }
  openAddUser() {
    this.dialog.open(AdUsersComponent, {panelClass:'active-directory'}).afterClosed().subscribe(
      (x: {Role: string, Users: string[]}) => {
        if(x) {
          if(x.Role === 'Admin') {
            this.rolesMapping.Users.Admin.push(...x.Users.filter(x => !this.rolesMapping.Users.Admin.includes(x)))
          } else if(x.Role === 'Hos') {
            this.rolesMapping.Users.Hos.push(...x.Users.filter(x => !this.rolesMapping.Users.Hos.includes(x)))
          } else if(x.Role === 'User') {
            this.rolesMapping.Users.User.push(...x.Users.filter(x => !this.rolesMapping.Users.User.includes(x)))
          }
        }
      }
    )
  }

  removeElement(elements: string[], i: number) {
    this.confirm.open('Are you sure you want to remove access?').pipe(
      filter(x => x),
      tap(() => {
        elements.splice(i,1);
      })
    ).subscribe();

  }

}
