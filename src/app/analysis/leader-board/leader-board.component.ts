import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { delay, merge, Observable, switchMap, tap } from 'rxjs';
import { LeaderBoard, LeaderBoardwithSize } from 'src/app/app-models/analysis';
import { Schedule } from 'src/app/app-models/schedules';
import { AnalysisService } from 'src/app/app-services/analysis/analysis.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnChanges, AfterViewInit {
  @Input() schedule!: Schedule;
  pageSize = 10;
  dataSize = 0;
  listData!: LeaderBoard[];
  listSize: number = 0;
  isLoading = this.analysisService.isLoadinGetLeaderBoard;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private analysisService: AnalysisService,
              private router: Router) { }
  ngOnChanges(changes: SimpleChanges): void {
      if(changes["schedule"] && this.schedule) {
        this.paginator.pageIndex = 0;
        this.analysisService.getLeaderBoard(this.schedule.Id, 0, this.paginator ? this.paginator.pageSize : this.pageSize)
        .subscribe(result => {
          this.listData = result.Data;
          this.listSize = result.DataSize;
        })
      }
  }
  ngAfterViewInit(): void {
      this.paginator.page.pipe(
        switchMap(page => {
          return this.analysisService.getLeaderBoard(this.schedule.Id, page.pageIndex, page.pageSize)
        })
      ).subscribe(result => {
        this.listData = result.Data;
      })
  }

  openStaffAdherence(StaffId: number) {
    // Converts the route into a string that can be used
    // with the window.open() function
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`schedule-details/daily-attendance/${this.schedule.Id}/by-staff/${StaffId}`])
    );
    window.open('#' + url, '_blank');
  }

}
