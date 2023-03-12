import {Component} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-save-book-form',
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.scss']
})
export class BookForm {

  book: Book = {
    id: '',
    title: '',
    author: '',
    genre: '',
    year: 0,
    added: '',
    checkOutCount: 0,
    status: 'AVAILABLE',
    dueDate: '',
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  saveBook(book: Book): void {
    book.added = this.getCurrentDate();
    book.status = "AVAILABLE"
    console.log('SAVE');
    this.bookService.saveBook(book)
      .subscribe(
        (response) => {
          const id = response.body;
          console.log(`Received bookId: ${id}`);
          this.router.navigate(['/books', id]);
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            console.log(`Error occurred: ${error.status}, ${error.statusText}`);
            this.router.navigate(['/books', error.error.text]);
          }
        }
      );
  }

}
