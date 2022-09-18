import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IClient } from '../models/client';
import { TransactionPipe } from './transaction.pipe';
import { Observable } from 'rxjs';

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

  filterClientData(
    data: IClient[],
    transaction: string
  ): Observable<IClient>[] {
    return this.transactionPipe.transform(data, transaction);
  }
}
