import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Checkout} from "../../models/checkout";
import {CheckoutService} from "../../services/checkout.service";
import {HttpErrorResponse} from "@angular/common/http";
import {formatDate} from "@angular/common";

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
    private router: Router
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
  }

  updateBook(book: Book) {
    console.log(book);
    this.bookService.updateBook(book).subscribe();
    location.reload()
  }

  toggleCheckoutButton() {
    this.checkoutMode = !this.checkoutMode;
    this.editMode = false;
  }

  checkoutBook(checkout: Checkout) {
    checkout.checkedOutDate = new Date();
    checkout.borrowedBook.status = "BORROWED";
    checkout.borrowedBook.dueDate = formatDate(checkout.dueDate, 'yyyy-MM-dd', 'en-US');
    console.log(checkout.borrowedBook);
    this.bookService.updateBook(checkout.borrowedBook).subscribe();
    console.log(checkout)
    this.checkoutService.saveCheckout(checkout).subscribe(
      (response) => {
        const id = response.body;
        console.log(`Received checkoutId: ${id}`);
        this.router.navigate(['/checkouts', id]);
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(`Error occurred: ${error.status}, ${error.statusText}`);
          this.router.navigate(['/checkouts', error.error.text]);
        }
      }
    );
  }
}
