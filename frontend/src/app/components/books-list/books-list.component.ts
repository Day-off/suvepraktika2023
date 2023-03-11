import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Book} from '../../models/book';
import {PageEvent} from "@angular/material/paginator";
import { Router} from "@angular/router";

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
    private router: Router,
    private bookService: BookService,
  ) {
  }

  onSortChange(sortBy: string, direction: 'asc' | 'desc') {
    this.pageRequest$.sort = sortBy;
    this.pageRequest$.direction = direction || 'asc';
    this.books$ = this.bookService.getBooks(this.pageRequest$);
    localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageRequest$.pageIndex = pageEvent.pageIndex;
    this.pageRequest$.pageSize = pageEvent.pageSize;

    this.books$ = this.bookService.getBooks(this.pageRequest$);
    localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));
  }

  ngOnInit(): void {
    const savedPageRequest = localStorage.getItem('pageRequest');
    if (savedPageRequest) {
      this.pageRequest$ = JSON.parse(savedPageRequest);
    }

    this.books$ = this.bookService.getBooks(this.pageRequest$);
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books$ = this.bookService.getBooks(this.pageRequest$);
      localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));
    });
    location.reload();
  }
}
