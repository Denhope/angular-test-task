import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IClient, TransactionEnum } from 'src/app/models/client';
import { ListService } from 'src/app/services/list.service';
import { TransactionPipe } from 'src/app/services/transaction.pipe';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  providers: [TransactionPipe, ListService],
})
export class SummaryComponent implements OnInit {
  clients!: IClient[];
  clientsSubscription!: Subscription;
  filtredClientsIncome!: Observable<IClient>[];
  filtredClientsOutcome!: Observable<IClient>[];
  filtredClientsInvest!: Observable<IClient>[];
  filtredClientsLoan!: Observable<IClient>[];

  constructor(
    private ListService: ListService // private transactionPipe: TransactionPipe
  ) {}

  ngOnInit(): void {
    this.clientsSubscription = this.ListService.getClientData().subscribe(
      (data) => {
        this.clients = data;
        this.filtredClientsIncome = this.ListService.filterClientData(
          this.clients,
          TransactionEnum.INCOME
        );
        this.filtredClientsOutcome = this.ListService.filterClientData(
          this.clients,
          TransactionEnum.OUTCOME
        );
        this.filtredClientsInvest = this.ListService.filterClientData(
          this.clients,
          TransactionEnum.INVESTMENT
        );
        this.filtredClientsLoan = this.ListService.filterClientData(
          this.clients,
          TransactionEnum.LOAN
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.clientsSubscription) this.clientsSubscription.unsubscribe;
  }
}
