import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";

@Component({
  selector: 'app-checkout-list',
  templateUrl: './checkout-list.component.html',
  styleUrls: ['./checkout-list.component.scss']
})
export class CheckoutListComponent implements OnInit {

  checkouts$!: Observable<Page<Checkout>>;

  constructor(
    private checkoutService: CheckoutService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.checkouts$ = this.checkoutService.getCheckOuts({});

  }

}
