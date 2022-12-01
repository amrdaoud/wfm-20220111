import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Schedule } from 'src/app/app-models/schedules';
import { AnalysisService } from 'src/app/app-services/analysis/analysis.service';

@Component({
  selector: 'app-adherence-by-hos',
  templateUrl: './adherence-by-hos.component.html',
  styleUrls: ['./adherence-by-hos.component.css']
})
export class AdherenceByHosComponent implements OnChanges {
  @Input() schedule!: Schedule;
  dataObservable = new BehaviorSubject<any[]>([]);
  isLoading = this.analyisService.isLoadinGetAdherenceByHos;
  constructor(private analyisService: AnalysisService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["schedule"] && this.schedule) {
      this.analyisService.getAdherenceByHos(this.schedule.Id).subscribe(x => {

        this.dataObservable.next(x)
      });
    }
  }

}
