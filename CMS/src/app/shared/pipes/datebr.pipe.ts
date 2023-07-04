import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class DateBrPipe implements PipeTransform {
  transform(date: any, args?: any): any {
    let dateformat = '';

    if (date != undefined && date.indexOf("0001-01-01") == -1) {
      if (args == 'DD/MM/YYYY') {
        dateformat = date.substring(8, 10) + '/' +
          date.substring(5, 7) + '/' +
          date.substring(0, 4);
      }

      if (args == 'HH:mm') {
        dateformat = date.substring(0, 2) + ':' +
          date.substring(3, 5);
      }

      if (args == 'DD/MM/YYYY HH:mm STR') {
        dateformat = date.substring(8, 10) + '/' +
          date.substring(5, 7) + '/' +
          date.substring(0, 4) + ' ' +
          date.substring(11, 16);
      }

      if (args == 'DD/MM/YYYY STR') {
        dateformat = date.substring(8, 10) + '/' +
          date.substring(5, 7) + '/' +
          date.substring(0, 4);
      }
    }

    return dateformat;
  }
}
