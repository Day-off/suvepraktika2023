import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Observable} from 'rxjs';
import {Page, PageRequest, SortDirection} from '../../models/page';
import {Book} from '../../models/book';
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute,  Router} from "@angular/router";

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

  searchQuery = '';
  previousInput = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.link();
    this.onSearch()
  }

  onPageChange(pageEvent: PageEvent) {
    this.pageRequest$.pageIndex = pageEvent.pageIndex;
    this.pageRequest$.pageSize = pageEvent.pageSize;
    console.log(this.searchQuery)
    this.link();
    this.onSearch()
  }

  ngOnInit(): void {
    this.onSearch();
  }

  deleteBook(id: string): void {
    this.bookService.deleteBook(id).subscribe(() => {
      this.books$ = this.bookService.getBooks(this.pageRequest$);
      localStorage.setItem('pageRequest', JSON.stringify(this.pageRequest$));
      localStorage.setItem('deleteMode', JSON.stringify(this.showDeleteButtons))
    });
    location.reload();
  }


  onSearchInputChange() {
    // @ts-ignore
    this.searchQuery = this.searchInput.nativeElement.value;
  }

  onSearchButtonClick() {
    this.link();
    this.onSearch();
  }

  link(): void {
    this.router.navigate(['/books', {
      page: this.pageRequest$.pageIndex,
      size: this.pageRequest$.pageSize,
      sort: this.pageRequest$.sort,
      direction: this.pageRequest$.direction,
      input: this.searchQuery
    }]);
  }

  onSearch() {
    this.route.paramMap.subscribe(params => {
      const input = params.get('input') || '';
      const page = params.get('page') || 0;
      const size = params.get('size') || 5;
      const sort = params.get('sort') || '';
      const direction = params.get('direction') || "asc";
      this.searchQuery = input;
      this.pageRequest$.pageIndex = Number(page);
      this.pageRequest$.pageSize = Number(size);
      this.pageRequest$.sort = sort;
      this.pageRequest$.direction = direction as SortDirection;
      console.log(input)
      console.log(page)
      this.books$ = this.bookService.search(this.pageRequest$, input);
    });
  }
}
