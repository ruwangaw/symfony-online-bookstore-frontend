import { MstBooksCategoryResponse } from "../response/mst-books-category-response";

export class BooksRequest{
    id:number;
    isbn:string;
    title:string;
    categoryCode:string;
}