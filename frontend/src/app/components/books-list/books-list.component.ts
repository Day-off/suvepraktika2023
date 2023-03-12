import {Component, OnInit, ViewChild,ElementRef} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page, PageRequest} from '../../models/page';
import {Book} from '../../models/book';
import {PageEvent} from "@angular/material/paginator";
import {NavigationEnd, Router} from "@angular/router";

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
  @ViewChild('searchInput') searchInput: ElementRef | undefined;

  searchQuery =''

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
    this.onSearch()
    localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageRequest$.pageIndex = pageEvent.pageIndex;
    this.pageRequest$.pageSize = pageEvent.pageSize;

    this.onSearch()
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

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        localStorage.removeItem('pageRequest');
        localStorage.removeItem('deleteMode');
      }
    });
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books$ = this.bookService.getBooks(this.pageRequest$);
      localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));
      localStorage.setItem('deleteMode', JSON.stringify(this.showDeleteButtons))
    });
    this.onSearch()
  }


  onSearchInputChange() {
    // @ts-ignore
    this.searchQuery = this.searchInput.nativeElement.value;
  }

  onSearchButtonClick() {
    this.pageRequest$.pageIndex =0;
    this.books$ = this.bookService.search(this.pageRequest$, this.searchQuery);
  }
  onSearch() {
    this.books$ = this.bookService.search(this.pageRequest$, this.searchQuery);
  }
}
