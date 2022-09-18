import { Pipe, PipeTransform } from '@angular/core';
import { IClient } from '../models/client';

@Pipe({
  name: 'transaction',
})
export class TransactionPipe implements PipeTransform {
  transform(itemList: any, searchValue: string) {
    if (!itemList) return [];
    if (!searchValue) return itemList;
    let filteredList: IClient[] = [];
    if (itemList.length > 0) {
      itemList.forEach((item: IClient) => {
        let propValueList = Object.values(item);
        for (let i = 0; i < propValueList.length; i++) {
          if (propValueList[i]) {
            if (
              propValueList[i].toString().toLowerCase().indexOf(searchValue) >
              -1
            ) {
              filteredList.push(item);
              break;
            }
          }
        }
      });
    }
    return filteredList;
  }
}
