import { BooksDicounts } from "./response/books-discounts";
import { BooksResponse } from "./response/books-response";

export class ShoppingCartBooks{
    book:BooksResponse;
    bookCount:number;
    bookDiscount:BooksDicounts;
    netBookAmount:number;
    bookDiscountAmount:number;
    grossBookAmount:number;
}