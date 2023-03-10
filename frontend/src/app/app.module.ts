import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {BooksListComponent} from './components/books-list/books-list.component';
import {BookDetailComponent} from './components/book-detail/book-detail.component';
import {CheckoutListComponent} from './components/checkouts-list/checkout-list.component';
import {CheckoutDetailComponent} from './components/checkout-detail/checkout-detail.component';
import {BookForm} from './components/save-book-form/book-form.component'
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookDetailComponent,
    CheckoutListComponent,
    CheckoutDetailComponent,
    BookForm

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
