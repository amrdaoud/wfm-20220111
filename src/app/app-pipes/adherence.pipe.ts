import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AdherenceService } from '../app-services/adherences/adherence.service';

@Pipe({
  name: 'adherence'
})
export class AdherencePipe implements PipeTransform {
  constructor(private adherenceService: AdherenceService){}
  transform(scheduleId: number,staffId?: number | null, day?: Date | null, trigger?: any, isAll?: boolean): Observable<number | undefined> {
    if(staffId && day) {
      return this.adherenceService.getByStaffDay(scheduleId, staffId ,new Date(day))
    }
    if(staffId && !day) {
      return this.adherenceService.getByStaff(scheduleId, staffId);
    }
    if(!staffId && day) {
      if(isAll) {
        return this.adherenceService.getByDayAll(scheduleId, new Date(day))
      }
      return this.adherenceService.getByDay(scheduleId, new Date(day))
    }
    if(!staffId && !day && scheduleId) {
      if(isAll) {
        return this.adherenceService.getByScheduleAll(scheduleId);
      }
      return this.adherenceService.getBySchedule(scheduleId);
    }
    else {
      return of(undefined);
    }


  }

}
