import { MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from 'src/app/app-services/configurations/config.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap, Observable, filter, startWith } from 'rxjs';

@Component({
  selector: 'app-ad-groups',
  templateUrl: './ad-groups.component.html',
  styleUrls: ['./ad-groups.component.css']
})
export class AdGroupsComponent implements OnInit {
searchControl = new FormControl('');
isLoading = this.configService.isGettingAD;
groups = new Observable<string[]>();
ret = {Role: '', Groups: []};
  constructor(private configService: ConfigService,
              private dialogRef: MatDialogRef<AdGroupsComponent>) { }

  ngOnInit(): void {
    this.groups = this.searchControl.valueChanges.pipe(
      startWith(''),
      filter(val => val && val.length > 2),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.configService.getADGroups(val)
      })
    );
  }
  add() {
    this.dialogRef.close(this.ret);
  }

}
