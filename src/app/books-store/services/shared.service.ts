import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MstBooksCategoryResponse } from '../models/response/mst-books-category-response';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  DATA_URL = environment.BASE_DATA_URL;
  constructor(
    private _http: HttpClient,
    ) { }

    getMstBooksCategories(): Observable<MstBooksCategoryResponse[]>{
      return this._http.get<MstBooksCategoryResponse[]>(this.DATA_URL + "/mst-books-categories");
    }
}
