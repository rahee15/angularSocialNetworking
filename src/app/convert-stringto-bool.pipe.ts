import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertStringtoBool'
})
export class ConvertStringtoBoolPipe implements PipeTransform {

  transform(value:String): boolean {
    if(value=="TRUE")
    {
      return true;
    }
    else
    {
      return false;
    }
  
  }

}
 