import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cFL'
})
export class CapitalizeFLPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    const words = value.split(' ');
    const capitalizedWords = words.map(word => {
      if (word.length > 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      } else {
        return word;
      }
    });
    return capitalizedWords.join(' ');
  }
}
