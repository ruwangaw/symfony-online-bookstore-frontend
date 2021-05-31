import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BooksRequest } from '../models/request/books-request';
import { BooksResponse } from '../models/response/books-response';
import { MstBooksCategoryResponse } from '../models/response/mst-books-category-response';

@Injectable({
  providedIn: 'root'
})
export class BooksStoreService {

  DATA_URL = environment.BASE_DATA_URL;
  selectedMstBookCategorySubject = new Subject<MstBooksCategoryResponse>();

  constructor(
    private _http: HttpClient,
  ) { }

  onCategoryMenuSelected(mstBooksCategoryResponse: MstBooksCategoryResponse) {
    this.selectedMstBookCategorySubject.next(mstBooksCategoryResponse);
  }

  getBooks(booksRequest: BooksRequest): Observable<BooksResponse[]> {
    let params = new HttpParams();

    if (typeof booksRequest.id !== 'undefined' && booksRequest.id !== null) {
      params = params.append("id", booksRequest.id.toString());
    }
    if (typeof booksRequest.isbn !== 'undefined' && booksRequest.isbn !== null) {
      params = params.append("isbn", booksRequest.isbn);
    }
    if (typeof booksRequest.title !== 'undefined' && booksRequest.title !== null) {
      params = params.append("title", booksRequest.title);
    }
    if (typeof booksRequest.categoryCode !== 'undefined' && booksRequest.categoryCode !== null) {
      params = params.append("categoryCode", booksRequest.categoryCode);
    }

    return this._http.get<BooksResponse[]>(this.DATA_URL + "/archives",  {params: params} ) .pipe(catchError(error => of(error.url)));;
  }

  getBookById(id: number): Observable<BooksResponse> {
    return this._http.get<BooksResponse>(this.DATA_URL + "/archives/"+ id) .pipe(catchError(error => of(error.url)));;
  }


}
