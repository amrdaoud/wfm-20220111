import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'useradherence'
})
export class UseradherencePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
