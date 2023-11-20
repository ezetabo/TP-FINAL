import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagenEspGenerica'
})
export class ImagenEspGenericaPipe implements PipeTransform {

  transform(imagePath: string | null | undefined): string {
    const defaultImagePath = 'https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/MRKDWN%2Fgenerica_1700352665384?alt=media&token=77471837-454e-4780-9c56-d2e79c291717';

    if (!imagePath || imagePath.trim() === '') {
      return defaultImagePath;
    }

    return imagePath;
  }

}
