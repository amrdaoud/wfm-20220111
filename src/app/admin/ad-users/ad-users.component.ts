import { ADUser } from './../../app-models/root-models/app-user';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, Observable, startWith, switchMap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/app-services/configurations/config.service';

@Component({
  selector: 'app-ad-users',
  templateUrl: './ad-users.component.html',
  styleUrls: ['./ad-users.component.css']
})
export class AdUsersComponent implements OnInit {
  searchControl = new FormControl('');
  isLoading = this.configService.isGettingAD;
  users = new Observable<ADUser[]>();
  ret = {Role: '', Users: []};
  constructor(private configService: ConfigService,
              private dialogRef: MatDialogRef<AdUsersComponent>) { }

  ngOnInit(): void {
    this.users = this.searchControl.valueChanges.pipe(
      startWith(''),
      filter(val => val && val.length > 2),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.configService.getADUsers(val)
      })
    );
  }
  add() {
    this.dialogRef.close(this.ret);
  }
}
