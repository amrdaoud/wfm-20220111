import { SwapRequestService } from './../../app-services/swap-requests/swap-request.service';
import { Component, OnInit } from '@angular/core';
import { swapColumns, SwapRequest, SwapRequestApprovalBinding } from 'src/app/app-models/swap-requests';
import { MatDialog } from '@angular/material/dialog';
import { SwapRequestDetailsComponent } from '../swap-request-details/swap-request-details.component';
import { exhaustMap, filter } from 'rxjs';

@Component({
  selector: 'app-swap-request-list',
  templateUrl: './swap-request-list.component.html',
  styleUrls: ['./swap-request-list.component.css']
})
export class SwapRequestListComponent implements OnInit {
  isLoading = this.swapService.status;
  observableData = this.swapService.myRequests;
  columnsDef = swapColumns;
  constructor(private swapService: SwapRequestService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.swapService.getInvolved();
  }
  showDetails(request: SwapRequest) {
    this.dialog.open(SwapRequestDetailsComponent, {panelClass: 'swap-dialog', data:request}).afterClosed().pipe(
      filter(result => result),
      exhaustMap((result: SwapRequestApprovalBinding) => {
        if(result.State === 'Reverse') {
          return this.swapService.reverseRequest(request.Id);
        }
        return this.swapService.handleRequest(result)
      })
    ).subscribe();
  }

}
