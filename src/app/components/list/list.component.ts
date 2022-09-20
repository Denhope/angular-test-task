import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { IClient } from 'src/app/models/client';
import { ListService } from 'src/app/services/list.service';
import { SearchValuePipe } from 'src/app/services/searchValue.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService, SearchValuePipe],
})
export class ListComponent implements OnInit {
  clients!: IClient[];
  filteredClients!: IClient[];

  tab!: Params;

  constructor(
    private ListService: ListService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.queryParams.subscribe((tab) => {
      this.filteredClients = this.ListService.getfilteredTabData(
        tab,
        this.clients
      );
      this.tab = tab;
    });
    this.ListService.getClientData().subscribe((data) => {
      this.clients = data;

      this.filteredClients = this.ListService.getfilteredTabData(
        this.tab,
        this.clients
      );
    });
  }
  ngOnDestroy() {
    // if (this.clientsSubscription) this.clientsSubscription.unsubscribe();
  }
}
