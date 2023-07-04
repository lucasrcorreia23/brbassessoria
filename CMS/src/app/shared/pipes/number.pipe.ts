import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number',
})
export class NumberPipe implements PipeTransform {
  transform(value: any, casas?: number) {
    let cc = 2;

    if (casas == 0 || casas) {
      cc = casas;
    }

    value = parseFloat(value);

    let n = value,
      c = cc,
      d = ',',
      t = '.',
      s = n < 0 ? '-' : '',
      i = parseInt((n = Math.abs(+n || 0).toFixed(c))) + '',
      j: any;
    j = (j = i.length) > 3 ? j % 3 : 0;

    return (
      s +
      (j ? i.substr(0, j) + t : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) +
      (c > 0
        ? d +
          Math.abs(n - parseInt(i))
            .toFixed(c)
            .slice(2)
        : '')
    );
  }
}
