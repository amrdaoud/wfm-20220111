import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScheduleDetail } from 'src/app/app-models/schedule-details';

@Component({
  selector: 'app-interval-box',
  templateUrl: './interval-box.component.html',
  styleUrls: ['./interval-box.component.css']
})
export class IntervalBoxComponent implements OnInit {
@Input() isSelected = false;
@Input() isLoading: boolean | undefined = false;
@Input() scheduleDetail: ScheduleDetail | undefined;
@Input() isMouseDown = false;
@Output() mouseDown = new EventEmitter<ScheduleDetail>();
@Output() mouseEnter = new EventEmitter<ScheduleDetail>();
  constructor() { }

  ngOnInit(): void {
  }

  onMouseDown(event: MouseEvent) {
    if(event.button === 0)
    this.mouseDown.emit(this.scheduleDetail);
  }
  onMouseEnter() {
    this.mouseEnter.emit(this.scheduleDetail);
  }

}
