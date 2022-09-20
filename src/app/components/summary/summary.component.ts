import { Component, OnInit } from '@angular/core';
import { IClient, TransactionEnum } from 'src/app/models/client';
import { ListService } from 'src/app/services/list.service';
import { SearchValuePipe } from 'src/app/services/searchValue.pipe';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  providers: [SearchValuePipe, ListService],
})
export class SummaryComponent implements OnInit {
  clients!: IClient[];
  filteredClientsIncome!: IClient[];
  filteredClientsOutcome!: IClient[];
  filteredClientsInvest!: IClient[];
  filteredClientsLoan!: IClient[];

  constructor(private ListService: ListService) {}

  ngOnInit(): void {
    this.ListService.getClientData().subscribe((data) => {
      this.clients = data;
      this.filteredClientsIncome = this.ListService.filterClientData(
        this.clients,
        TransactionEnum.INCOME
      );
      this.filteredClientsOutcome = this.ListService.filterClientData(
        this.clients,
        TransactionEnum.OUTCOME
      );
      this.filteredClientsInvest = this.ListService.filterClientData(
        this.clients,
        TransactionEnum.INVESTMENT
      );
      this.filteredClientsLoan = this.ListService.filterClientData(
        this.clients,
        TransactionEnum.LOAN
      );
    });
  }
}
