import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClient, TransactionEnum } from '../models/client';
import { TransactionPipe } from './transaction.pipe';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  url: string = 'http://localhost:3000/data';
  filtredClients!: IClient;

  router: any;
  constructor(
    private http: HttpClient,
    private transactionPipe: TransactionPipe
  ) {}

  getClientData() {
    return this.http.get<IClient[]>(this.url);
  }

  filterClientData(data: IClient[], transaction: string): IClient[] {
    return (this.filtredClients = this.transactionPipe.transform(
      data,
      transaction
    ));
  }
  getFiltredTabData(tab: Object, data: IClient[]): IClient[] {
    if (Object.values(tab)[0] === '3') {
      return this.filterClientData(data, TransactionEnum.INVESTMENT);
    } else if (Object.values(tab)[0] === '2') {
      return this.filterClientData(data, TransactionEnum.LOAN);
    } else if (Object.values(tab)[0] === '1') {
      return this.filterClientData(data, TransactionEnum.OUTCOME);
    } else if (Object.values(tab)[0] === '0') {
      return this.filterClientData(data, TransactionEnum.INCOME);
    } else {
      return [];
    }
  }
}
