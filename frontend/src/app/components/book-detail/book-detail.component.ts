import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  // book$!: Observable<Book>;

  // @ts-ignore
  book$: Book = {
    id: '',
    title: '',
    author: '',
    year: 0,
    genre: '',
    comment: ''
  };

  viewBook$!: Observable<Book>


  editMode = false;
  checkoutMode = false;


  constructor(
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private bookService: BookService,
    // private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.viewBook$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))
    this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))
      .subscribe(book => this.book$ = book);
  }

  goBack(): void {
    window.history.back();
  }

  toggleEditButton() {
    this.editMode = !this.editMode;
    this.checkoutMode = false;
    console.log("edit="+this.editMode)
    console.log("checkout="+this.checkoutMode)
  }

  updateBook(book: Book) {
    console.log(book);
    this.bookService.updateBook(book).subscribe();
    this.goBack()
  }

  toggleCheckoutButton() {
    this.checkoutMode = !this.checkoutMode;
    this.editMode = false;
    console.log("edit="+this.editMode)
    console.log("checkout="+this.checkoutMode)
  }

  checkoutBook(checkout: Checkout) {
    checkout.checkedOutDate = new Date();
    console.log(checkout)
    this.checkoutService.saveCheckout(checkout).subscribe();
  }
}
