import {Component, OnInit} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$!: Observable<Book>;

  editMode = false;


  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))
  }

  goBack(): void {
    window.history.back();  }

  toggleEditButton() {
    this.editMode = !this.editMode;
  }

  updateBook() {
    this.book$.subscribe(book => {
      this.bookService.updateBook(book)
    });
  }
}
