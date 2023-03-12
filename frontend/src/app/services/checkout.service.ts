import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Page, PageRequest } from '../models/page';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestUtil } from './rest-util';
import {Checkout} from "../models/checkout";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService{

  private readonly baseUrl = environment.backendUrl + '/api/checkout';

  constructor(
    private http: HttpClient,
  ) {
  }

  getCheckOuts(filter: Partial<PageRequest>): Observable<Page<Checkout>> {
    const url = this.baseUrl + '/getCheckouts';
    const params = RestUtil.buildParamsFromPageRequest(filter);
    return this.http.get<Page<Checkout>>(url, {params});
  }

  getCheckout(checkoutId: string): Observable<Checkout> {
    const url = this.baseUrl + '/getCheckout';
    const params = new HttpParams().set('checkOutId', checkoutId);
    return this.http.get<Checkout>(url, {params});
  }

  saveCheckout(checkout: Checkout): Observable<HttpResponse<any>> {
    console.log("SEND REQUEST")
    const url = this.baseUrl + '/checkout';
    console.log(checkout)
    return this.http.post<HttpResponse<any>>(url, checkout);
  }
  deleteCheckout(id: string): Observable<void> {
    console.log("SEND REQUEST")
    const url = this.baseUrl + '/checkout';
    const params = new HttpParams().set('checkOutId', id);
    return this.http.delete<void>(url, {params});
  }

  updateCheckout(checkout: Checkout): Observable<void> {
    console.log("SEND REQUEST")
    const url = this.baseUrl + '/checkout';
    console.log(checkout)
    return this.http.put<void>(url, checkout);
  }

}
