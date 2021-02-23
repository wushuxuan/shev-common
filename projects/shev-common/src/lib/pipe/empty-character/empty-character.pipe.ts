import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shevEmptyCharacter'
})
export class EmptyCharacterPipe implements PipeTransform {

  transform(value: any): any {
    const val = value;
    if (val == null || val.length == 0 || val == "null" || val == "") {
      return "-";
    } else {
      const reVal = val.toString().replace(/^\s*|\s*$/g, "");
      if (reVal.length == 0) {
        return "-";
      } else {
        return value;
      }
    }
  }

}

