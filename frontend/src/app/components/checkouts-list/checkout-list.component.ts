import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Page, PageRequest, SortDirection} from '../../models/page';
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";

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
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  link(): void {
    this.router.navigate(['/checkouts', {
      page: this.pageRequest$.pageIndex,
      size: this.pageRequest$.pageSize,
      sort: this.pageRequest$.sort,
      direction: this.pageRequest$.direction,
    }]);
  }


  onSortChange(sortBy: string, direction: 'asc' | 'desc') {
    this.pageRequest$.sort = sortBy;
    this.pageRequest$.direction = direction || 'asc';
    this.pageRequest$.pageIndex = 0;
    this.link();
    this.onSearch();
    }

  onPageChange(pageEvent: PageEvent) {
    this.pageRequest$.pageIndex = pageEvent.pageIndex;
    this.pageRequest$.pageSize = pageEvent.pageSize;
    this.link();
    this.onSearch();
  }


  ngOnInit(): void {
    this.onSearch();
  }

  toggleDeleteButtons() {
    this.showDeleteButtons = !this.showDeleteButtons;
    localStorage.setItem('deleteMode', JSON.stringify(this.showDeleteButtons))

  }

  deleteCheckout(id: string) {
    this.checkoutService.deleteCheckout(id).subscribe(() => {
      this.checkouts$ = this.checkoutService.getCheckOuts(this.pageRequest$);
    });
    location.reload();
  }

  onSearch() {
    this.route.paramMap.subscribe(params => {
      const page = params.get('page') || 0;
      const size = params.get('size') || 5;
      const sort = params.get('sort') || '';
      const direction = params.get('direction') || "asc";
      this.pageRequest$.pageIndex = Number(page);
      this.pageRequest$.pageSize = Number(size);
      this.pageRequest$.sort = sort;
      this.pageRequest$.direction = direction as SortDirection;
      this.checkouts$ = this.checkoutService.getCheckOuts(this.pageRequest$);
    });
  }
}
