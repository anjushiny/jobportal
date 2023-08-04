import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightPipe'
})
export class HighlightPipePipe implements PipeTransform {

  transform(value: string, searchText: string): string {

    if (!searchText || !value) {

      return value;

    }

    const regex = new RegExp(searchText, 'gi');

    return value.replace(regex, match => `<span class="highlight">${match}</span>`);

  }

}
