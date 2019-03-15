import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripdoublequotes'
})
export class StripdoublequotesPipe implements PipeTransform {

  transform(value: string): string {
   // console.log("value is "+value);
    return value.slice(1,-1);
  }

}
