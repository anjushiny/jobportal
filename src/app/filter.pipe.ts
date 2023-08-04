import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {

    if (!items || !searchText) {

      return items;

    }

    searchText = searchText.toLowerCase();

    return items.filter(item =>

      item.jobTitle.toLowerCase().includes(searchText) ||

      item.jobType.toLowerCase().includes(searchText) ||

      item.companyName.toLowerCase().includes(searchText)||

      item.location.toLowerCase().includes(searchText)

    );

  }

}
