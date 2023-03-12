import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";
import {PageEvent} from "@angular/material/paginator";
import {NavigationEnd, Router} from "@angular/router";

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

  showDeleteButtons = false;

  constructor(
    private checkoutService: CheckoutService,
    private router: Router
  ) {
  }

  onSortChange(sortBy: string, direction: 'asc' | 'desc') {
    this.pageRequest$.sort = sortBy;
    this.pageRequest$.direction = direction || 'asc';
    this.pageRequest$.pageIndex = 0;
    localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));

    this.checkouts$ = this.checkoutService.getCheckOuts(this.pageRequest$);
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageRequest$.pageIndex = pageEvent.pageIndex;
    this.pageRequest$.pageSize = pageEvent.pageSize;


    this.checkouts$ = this.checkoutService.getCheckOuts(this.pageRequest$);
    localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));
  }


  ngOnInit(): void {
    const savedPageRequest = localStorage.getItem('pageRequest');
    const deleteMode = localStorage.getItem('deleteMode');
    if (savedPageRequest) {
      this.pageRequest$ = JSON.parse(savedPageRequest);
    }
    if (deleteMode) {
      this.showDeleteButtons = JSON.parse(deleteMode);
    }

    this.checkouts$ = this.checkoutService.getCheckOuts(this.pageRequest$);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        localStorage.removeItem('pageRequest');
        localStorage.removeItem('deleteMode');
      }
    });
  }

  toggleDeleteButtons() {
    this.showDeleteButtons = !this.showDeleteButtons;
    localStorage.setItem('deleteMode', JSON.stringify(this.showDeleteButtons))

  }

  deleteCheckout(id: string) {
    this.checkoutService.deleteCheckout(id).subscribe(() => {
      this.checkouts$ = this.checkoutService.getCheckOuts(this.pageRequest$);
      localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));
      localStorage.setItem('deleteMode', JSON.stringify(this.showDeleteButtons))
    });
    console.log("DELETE CHECKOUT")
    location.reload();
  }
}
