import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'merge'
})
export class MergePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value && Array.isArray(value)) {
      return (value as Array<string>).join(',');
    }
    return value;

  }

}
