import {Book} from "./book";

export interface Checkout {
  id: string;
  borrowerFirstName: string;
  borrowerLastName: string;
  borrowedBook: Book;
  checkedOutDate: Date;
  dueDate: Date;
  returnedDate: Date;
}
