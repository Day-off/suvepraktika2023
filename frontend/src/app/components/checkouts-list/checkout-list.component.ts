import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss']
})
export class CheckoutListComponent implements OnInit {

  checkouts$!: Observable<Page<Checkout>>;
  pageRequest$: PageRequest = {
    pageSize: 5,
    pageIndex: 0
  };

  constructor(
    private checkoutService: CheckoutService,
  ) {
  }
  onSortChange(sortBy: string, direction: 'asc' | 'desc') {
    this.pageRequest$.sort = sortBy;
    this.pageRequest$.direction = direction || 'asc';
    this.checkouts$ = this.checkoutService.getCheckOuts(this.pageRequest$);
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageRequest$.pageIndex = pageEvent.pageIndex;
    this.pageRequest$.pageSize = pageEvent.pageSize;

    this.checkouts$ = this.checkoutService.getCheckOuts(this.pageRequest$);
  }


  ngOnInit(): void {
    this.checkouts$ = this.checkoutService.getCheckOuts(this.pageRequest$);
  }

}
