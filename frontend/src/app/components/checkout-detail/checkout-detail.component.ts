import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";
import {Book} from "../../models/book";
import {formatDate} from "@angular/common";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-checkout-detail',
  templateUrl: './checkout-detail.component.html',
  styleUrls: ['./checkout-detail.component.scss']
})
export class CheckoutDetailComponent implements OnInit {
  checkout$!: Observable<Checkout>;
  book$: Book = {
    added: "",
    checkOutCount: 0,
    dueDate: "",
    status: 'BORROWED',
    id: '',
    title: '',
    author: '',
    year: 0,
    genre: '',
    comment: ''
  };
  checkoutReference: Checkout = {
    id: '',
    borrowerFirstName: '',
    borrowerLastName: '',
    borrowedBook: this.book$,
    checkedOutDate: new Date(),
    dueDate: new Date(),
    returnedDate: new Date()
  };

  editMode = false;


  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.checkout$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.checkoutService.getCheckout(id)))
    this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.checkoutService.getCheckout(id)))
      .subscribe(checkout => this.checkoutReference = checkout);
  }

  toggleEditButton() {
    this.editMode = !this.editMode
  }

  goBack() {
    window.history.back();
  }

  updateCheckout(checkout: Checkout) {
    console.log(checkout);
    checkout.checkedOutDate = new Date();
    checkout.borrowedBook.dueDate = formatDate(checkout.dueDate, 'yyyy-MM-dd', 'en-US');
    this.bookService.updateBook(checkout.borrowedBook).subscribe();
    this.checkoutService.updateCheckout(checkout).subscribe();
    location.reload();
  }
}
