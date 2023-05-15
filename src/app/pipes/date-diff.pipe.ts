import { Pipe, PipeTransform } from '@angular/core';
import { Ads } from '../models/ads';

@Pipe({
  name: 'dateDiff'
})
export class DateDiffPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    // console.log(value)
    for (let index = 0; index < value?.length; index++) {
      var today:any = new Date();

      const diffInMs  = new Date(value[index].end_date).valueOf() - new Date(value[index].start_date).valueOf()
      const diffIssnMs  = new Date(value[index].end_date).valueOf() - new Date().valueOf()
      value[index]['dates_count'] = Number(diffInMs / (1000 * 60 * 60 * 24));


      var start:any = new Date(value[index].start_date),
      end :any = new Date(value[index].end_date);
      value[index]['dates_percentage'] = Math.round(((end - start) * 100 ) / today);
    }
    // console.log(value)
    return value;
  }

}
