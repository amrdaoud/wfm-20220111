import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, Observable, switchMap, tap } from 'rxjs';
import { StaffMember } from 'src/app/app-models/resources';
import { DailyAttendanceByStaff, DailyAttendanceInfo } from 'src/app/app-models/schedule-details';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';
import { SwapRequestService } from 'src/app/app-services/swap-requests/swap-request.service';

@Component({
  selector: 'app-swap-request-add',
  templateUrl: './swap-request-add.component.html',
  styleUrls: ['./swap-request-add.component.css']
})
export class SwapRequestAddComponent implements OnInit {
isLoadingMySchedules = this.swapService.statusMySchedules;
isLoadingMyDayOffs = this.swapService.statusMyDayOffs;
isLoadingMySiblings = this.swapService.statusMySiblings;
isLoadingDestination = this.swapService.statusDestinationDayOffs;
isAdding = this.swapService.statusAdding;
frm = this.swapService.createForm();
mySchedules = this.swapService.getMySchedules();
scheduleId = 0;
myDayOffs = new Observable<DailyAttendanceByStaff>();
mySiblings = new Observable<StaffMember[]>();
destinationDayOffs: DailyAttendanceInfo[] = [];
  constructor(private swapService: SwapRequestService,
              private confirm: ConfirmService,
              private router: Router) { }

  ngOnInit(): void {
    this.frm.get('ScheduleId')?.valueChanges.pipe(
      tap(val => {
        this.scheduleId = val;
        this.myDayOffs = this.swapService.getMyDayoffs(this.scheduleId);
        this.mySiblings = this.swapService.getMySiblings(this.scheduleId);
        this.frm.get('Responder')?.setValue('');
      })
    ).subscribe();



    this.frm.get('Responder')?.valueChanges.pipe(
      filter(x => x && x !== ''),
      tap(() => {
        this.frm.get('DestinationDailyAttendanceId')?.setValue('');
      }),
      switchMap(val => {
        return this.swapService.getDestinationDayOffs(val, this.scheduleId);
      })
    ).subscribe(x => this.destinationDayOffs = x);
  }

  onSubmit() {
    if(this.frm.invalid) {
      return;
    }
    this.confirm.open('Are you sure you want to place this request?').pipe(
      filter(x => x),
      tap(() => {
        this.swapService.addRequest(this.frm.value).subscribe(x => {
          if(x) {
            this.router.navigateByUrl('/swap-requests');
          }
        })
      })
    ).subscribe()
  }

}
