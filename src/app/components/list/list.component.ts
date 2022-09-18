import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IClient } from 'src/app/models/client';
import { ListService } from 'src/app/services/list.service';
import { TransactionPipe } from 'src/app/services/transaction.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService, TransactionPipe],
})
export class ListComponent implements OnInit {
  clients!: IClient[];
  filtredClients!: IClient[];
  clientsSubscription!: Subscription;
  tab!: Params;

  constructor(
    private ListService: ListService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((tab) => {
      this.filtredClients = this.ListService.getFiltredTabData(
        tab,
        this.clients
      );
      this.tab = tab;
    });
    this.clientsSubscription = this.ListService.getClientData().subscribe(
      (data) => {
        this.clients = data;

        this.filtredClients = this.ListService.getFiltredTabData(
          this.tab,
          this.clients
        );
      }
    );
  }
}
