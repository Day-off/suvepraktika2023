import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Page, PageRequest} from '../models/page';
import {Book} from '../models/book';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {RestUtil} from './rest-util';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly baseUrl = environment.backendUrl + '/api/book';

  constructor(
    private http: HttpClient,
  ) {
  }

  getBooks(filter: Partial<PageRequest>): Observable<Page<Book>> {
    const url = this.baseUrl + '/getBooks';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Book>>(url, {params});
  }

  getBook(bookId: string): Observable<Book> {
    console.log("GET BOOK")
    const url = this.baseUrl + '/getBook';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.get<Book>(url, {params});
  }

  saveBook(book: Book): Observable<HttpResponse<any>> {
    const url = this.baseUrl + '/saveBook';
    console.log(book)
    return this.http.post<HttpResponse<any>>(url, book);
  }

  deleteBook(bookId: string): Observable<void> {
    const url = this.baseUrl + '/deleteBook';
    const params = new HttpParams().set('bookId', bookId);
    return this.http.delete<void>(url, {params});
  }

  updateBook(book: Book): Observable<void> {
    console.log("SEND UPDATE")
    const url = this.baseUrl + '/updateBook';
    console.log(book)
    return this.http.put<void>(url, book);
  }

  search(filter: Partial<PageRequest>, input: string): Observable<Page<Book>> {
    const url = this.baseUrl + '/search';
    const params = RestUtil.buildParamsFromPageRequest(filter).append("input", input);
    return this.http.get<Page<Book>>(url, {params});
  }
}
