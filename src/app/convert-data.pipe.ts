import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertData',
})
export class ConvertDataPipe implements PipeTransform {
  transform(data: any, data_type: string): string {
    return '';
  }
}
