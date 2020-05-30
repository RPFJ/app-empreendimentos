import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTitle'
})
export class FormatTitlePipe implements PipeTransform {
  //Finção responsávem em montar o nome dos forms de acordo com o nome do objeto
  transform(title: string): string {
    const result = title.replace(/([A-Z])/g, ' $1');
    const finalResult = result.charAt(0)
      .toUpperCase() + result.slice(1);

    return finalResult;
  }
}
