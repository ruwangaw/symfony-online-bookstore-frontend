import { MstBooksCategoryResponse } from "./mst-books-category-response";

export class BooksResponse {
    category: MstBooksCategoryResponse;
    id: number;
    isbn: string;
    price: string;
    title: string;
}