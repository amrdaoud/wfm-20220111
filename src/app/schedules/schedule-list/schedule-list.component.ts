import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, filter, switchMap, tap } from 'rxjs';
import { Schedule, scheduleColumns, ShiftRule } from 'src/app/app-models/schedules';
import { ScheduleService } from 'src/app/app-services/schedules/schedule.service';
import { ConfirmService } from 'src/app/app-services/shared/confirm.service';
import { ScheduleAddComponent } from '../schedule-add/schedule-add.component';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.css']
})
export class ScheduleListComponent implements OnInit {
  observableData = this.scheduleService.schedules();
  rulesObservableData = this.scheduleService.shiftRules();
  isLoading = this.scheduleService.status();
  isLoadingSchedule = this.scheduleService.statusSchedule();
  isPublishing = this.scheduleService.statusPublishing();
  columnsDef = scheduleColumns;
  shiftRules!: ShiftRule;
  constructor(private scheduleService: ScheduleService,
              private dialog: MatDialog,
              private confirm: ConfirmService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.rulesObservableData.subscribe(x => this.shiftRules = x);
  }
  openSchedule(model?: Schedule) {
    this.dialog.open(ScheduleAddComponent, {panelClass: 'add-dialog', disableClose: true, data: {ScheduleData: model, ShiftRuleData: this.shiftRules}})
        .afterClosed()
        .subscribe(result => {
          if(result) {
            if(model && !model.IsPublish) {
              this.scheduleService.edit(model.Id, result);
            } else if(model && model.IsPublish) {
              this.scheduleService.editPublished(model.Id, result);
            }
            else {
              this.scheduleService.add(result);
            }
          }
        });
  }

  publish(model: Schedule) {
    this.confirm.open(`You are about to publish ${model.Name}. Proceed?`).pipe(
      filter(x => x),
      exhaustMap(() => {
        return this.scheduleService.publishSchedule(model.Id);
      })
    ).subscribe(result => {
      if(result) {
        this.snackBar.open(`Schedule ${result.Name} is published`, 'Dismiss', {duration: 2000})
      }
    })
  }
  delete(model: Schedule) {
    this.confirm.open(`Are you sure you want to delete ${model.Name}?`).pipe(
      filter(x => x),
      tap(() => {
        this.scheduleService.delete(model.Id);
      })
    ).subscribe()
  }

}
