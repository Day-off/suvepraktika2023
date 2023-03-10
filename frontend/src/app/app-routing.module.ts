import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import {CheckoutDetailComponent} from "./components/checkout-detail/checkout-detail.component";
import {CheckoutListComponent} from "./components/checkouts-list/checkout-list.component";
import {BookForm} from "./components/save-book-form/book-form.component"

const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books/:id', component: BookDetailComponent},
  {path: 'saveBook', component: BookForm},

  {path: 'checkouts', component: CheckoutListComponent},
  {path: 'checkouts/:id', component: CheckoutDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
