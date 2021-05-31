import { BooksResponse } from "../response/books-response";

export class ShoppingCartBooksRequest {
    id: number
    shopping_cart: number;
    book: BooksResponse;
    item_count: number;
    calculated_price: number;
}