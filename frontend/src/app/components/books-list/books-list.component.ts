import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Book} from '../../models/book';
import {PageEvent} from "@angular/material/paginator";
import {Router} from "@angular/router";

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
  showDeleteButtons = false;

  constructor(
    private router: Router,
    private bookService: BookService,
  ) {
  }

  toggleDeleteButtons() {
    this.showDeleteButtons = !this.showDeleteButtons;
    localStorage.setItem('deleteMode', JSON.stringify(this.showDeleteButtons))
  }

  onSortChange(sortBy: string, direction: 'asc' | 'desc') {
    this.pageRequest$.sort = sortBy;
    this.pageRequest$.direction = direction || 'asc';
    this.pageRequest$.pageIndex = 0;
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
    const deleteMode = localStorage.getItem('deleteMode');
    if (savedPageRequest) {
      this.pageRequest$ = JSON.parse(savedPageRequest);
    }
    if (deleteMode) {
      this.showDeleteButtons = JSON.parse(deleteMode);
    }

    this.books$ = this.bookService.getBooks(this.pageRequest$);
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books$ = this.bookService.getBooks(this.pageRequest$);
      localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));
      localStorage.setItem('deleteMode', JSON.stringify(this.showDeleteButtons))
    });
    location.reload();
  }

  goBack(): void {
    window.history.back();
  }


}
