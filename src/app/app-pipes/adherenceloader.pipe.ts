import { Pipe, PipeTransform } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { AdherenceByStaffDayLoader } from '../app-models/adherences';
import { AdherenceService } from '../app-services/adherences/adherence.service';

@Pipe({
  name: 'adherenceloader'
})
export class AdherenceloaderPipe implements PipeTransform {
  constructor(private adherenceService: AdherenceService){}
  transform(scheduleId: number, staffId?: number | null, day?: Date | null, isAll?: boolean): Observable<boolean> {
    if(staffId && day) {
      return this.adherenceService.loaderByStaffDay.pipe(
        delay(1),
        map(x => {
          return x.some(y => y.Day.getTime() === new Date(day).getTime() && y.StaffId === staffId)
        })
      )
    }
    if(staffId && !day) {
      return this.adherenceService.loaderByStaff.pipe(
        delay(1),
        map(x => {
          return x.some(y => y.ScheduleId === scheduleId && y.StaffId === staffId)
        })
      )
    }
    if(!staffId && day) {
      if(isAll) {
        return this.adherenceService.loaderByDayAll.pipe(
          delay(1),
          map(x => {
            return x.some(y => y.Day.getTime() === new Date(day).getTime())
          })
        )
      }
      return this.adherenceService.loaderByDay.pipe(
        delay(1),
        map(x => {
          return x.some(y => y.Day.getTime() === new Date(day).getTime())
        })
      )
    }
    if(!staffId && !day) {
      if(isAll) {
        return this.adherenceService.loaderByScheduleAll.pipe(
          delay(1),
          map(x => {
            return x.some(y => y.ScheduleId === scheduleId)
          })
        )
      }
      return this.adherenceService.loaderBySchedule.pipe(
        delay(1),
        map(x => {
          return x.some(y => y.ScheduleId === scheduleId)
        })
      )
    }
    else {
      return of(false);
    }

  }

}
