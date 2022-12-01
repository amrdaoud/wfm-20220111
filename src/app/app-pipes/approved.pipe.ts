import { Pipe, PipeTransform } from '@angular/core';
import { UserChoice } from '../app-models/day-offs';

@Pipe({
  name: 'approved'
})
export class ApprovedPipe implements PipeTransform {

  transform(value: UserChoice, ...args: unknown[]): unknown {
    return value.DayOption1?.IsApproved ? value.DayOption1.Days.join(',') :
           value.DayOption2?.IsApproved ? value.DayOption2.Days.join(',') :
           value.DayOption3?.IsApproved ? value.DayOption3.Days.join(',') :
           value.DayOption4?.IsApproved ? value.DayOption4.Days.join(',') + '(Admin)':
           'Not Selected'
  }

}
