import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Book} from '../../models/book';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  books$!: Observable<Page<Book>>;
  pageRequest$: PageRequest = {
    pageSize: 5,
    pageIndex: 0
  };

  constructor(
    private bookService: BookService,
  ) {
  }
  onSortChange(sortBy: string, direction: 'asc' | 'desc') {
    this.pageRequest$.sort = sortBy;
    this.pageRequest$.direction = direction || 'asc';
    this.books$ = this.bookService.getBooks(this.pageRequest$);
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageRequest$.pageIndex = pageEvent.pageIndex;
    this.pageRequest$.pageSize = pageEvent.pageSize;

    this.books$ = this.bookService.getBooks(this.pageRequest$);
  }

  ngOnInit(): void {
    this.books$ = this.bookService.getBooks(this.pageRequest$);
  }

  deleteBook(id: string) {
    this.bookService.deleteBook(id);
    console.log("DELETE")
    this.ngOnInit()
  }
}
