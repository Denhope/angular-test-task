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
  paramsSubscription!: Subscription;

  constructor(
    private ListService: ListService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.router.queryParams.subscribe((tab) => {
      this.filteredClients = this.ListService.getFilteredTabData(
        tab,
        this.clients
      );
      this.tab = tab;
    });

    this.ListService.getClientData().subscribe((data) => {
      this.clients = data;
      this.filteredClients = this.ListService.getFilteredTabData(
        this.tab,
        this.clients
      );
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
