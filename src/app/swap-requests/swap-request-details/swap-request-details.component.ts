import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { filter, tap } from 'rxjs';
import { SwapRequest, SwapRequestApprovalBinding } from 'src/app/app-models/swap-requests';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';

@Component({
  selector: 'app-swap-request-details',
  templateUrl: './swap-request-details.component.html',
  styleUrls: ['./swap-request-details.component.css']
})
export class SwapRequestDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: SwapRequest,
              private dialogRef: MatDialogRef<SwapRequestDetailsComponent>,
              private confirm: ConfirmService) { }

  ngOnInit(): void {
  }
  closeApproval(state: string) {
    const approvalBinding: SwapRequestApprovalBinding = {RequestId: this.data.Id, State: state, Reason: "", IsApproved: state === 'Approve'}
    this.confirm.open(`You are about to ${state} request. Proceed?`).pipe(
      filter(x => x),
      tap(() => {
        this.dialogRef.close(approvalBinding);
      })
    ).subscribe();

  }

}
