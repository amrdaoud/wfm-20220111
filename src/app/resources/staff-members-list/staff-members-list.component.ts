import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { StaffMember, StaffMemberColumns } from 'src/app/app-models/resources';
import { ColumnDef, DynamicTableByndingModel } from 'src/app/app-models/shared/table-config';
import { StaffMemberService } from 'src/app/app-services/resources/staff-member.service';

@Component({
  selector: 'app-staff-members-list',
  templateUrl: './staff-members-list.component.html',
  styleUrls: ['./staff-members-list.component.css']
})
export class StaffMembersListComponent implements OnInit {
observableData = new Observable<StaffMember[]>();
data!: StaffMember[];
observableSize = this.staffService.resultsSize();
isLoading = this.staffService.status();
pageSize: number = 0;
columnsDef: ColumnDef[] = StaffMemberColumns;
  constructor(private staffService: StaffMemberService,
              private router: Router) { }

  ngOnInit(): void {
  }
  changeBinding(filterObservable: Observable<DynamicTableByndingModel>) {
    this.observableData = filterObservable.pipe(
      switchMap(x => {
        this.staffService.bindingModel = x;
        return this.staffService.getAll();
        // return this.staffService.staffMembers();
      })
    );
  }
  goToStaff(staff?:StaffMember): void {
    if(!staff) {
      this.router.navigateByUrl('resources/staff-members/add');
    } else {
      this.router.navigateByUrl(`resources/staff-members/${staff.Id}`);
    }

  }

}
