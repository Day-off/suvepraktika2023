import { Component} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../models/book";

@Component({
  selector: 'app-save-book-form',
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.scss']
})
export class BookForm {


  constructor(
    private bookService: BookService,
  ) {
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  saveBook(book: Book) {
    book.added = this.getCurrentDate();
    book.status = "AVAILABLE"
    this.bookService.saveBook(book);
  }


}
