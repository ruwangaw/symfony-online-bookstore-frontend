import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, map, scan, shareReplay, startWith, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ShoppingCartRequest } from '../models/request/shopping-cart-request';
import { ShoppingCartResponse } from '../models/response/shopping-cart-response';
import { BooksResponse } from '../models/response/books-response';
import { ShoppingCartBooks } from '../models/shopping-cart-book';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  DATA_URL = environment.BASE_DATA_URL;
  shoppingCartBooks: ShoppingCartBooks[] = [];
  books: BooksResponse;

  private booksList$ = new Subject<BooksResponse>();
  private cartSubject = new BehaviorSubject<ShoppingCartBooks[]>([]);
  cartState$ = this.cartSubject.asObservable();

  constructor(
    private sessionStorage: SessionStorageService,
    private _http: HttpClient,
  ) {
    this.sessionStorage.observe('key').subscribe((value) => {
      console.log('new value', value)
    });
  }




  addCartItem(item: BooksResponse, itemCount = 1) {
    const shoppingCartNewItem = new ShoppingCartBooks();
    const bookItemPrice = parseFloat(item.price);
    shoppingCartNewItem.book = item;
    shoppingCartNewItem.bookCount = itemCount;
    shoppingCartNewItem.netBookAmount = itemCount * bookItemPrice;

    const shoppingCartBooks = this.cartSubject.getValue();
    if (shoppingCartBooks.length > 0) {
      const cartBookId = shoppingCartBooks.findIndex(cartBook => {
        return cartBook.book.id === item.id;
      });
      console.log(cartBookId);

      if (cartBookId >= 0) {
        const updatedOrderBook = shoppingCartBooks[cartBookId];
        shoppingCartBooks[cartBookId].bookCount += itemCount;
        shoppingCartBooks[cartBookId].netBookAmount = shoppingCartBooks[cartBookId].bookCount * bookItemPrice;
        const newOrderBooks = shoppingCartBooks.slice(0);
        newOrderBooks[cartBookId] = { ...shoppingCartBooks[cartBookId], ...updatedOrderBook }
      }
      else {
        shoppingCartBooks.push(shoppingCartNewItem);
      }
    }
    else {
      shoppingCartBooks.push(shoppingCartNewItem);
    }
    this.sessionStorage.store(environment.SESSION_STORAGE_SHOPPING_CART,JSON.stringify(shoppingCartBooks));
    this.cartSubject.next(shoppingCartBooks);
    console.log(shoppingCartBooks);
  }
  // facade for next of cartRemove subject
  removeCartItem(id: number) {

  }

  getBooks() {
    return this.booksList$;
  }

  getItems(booksResponse: BooksResponse) {
    console.log("service", booksResponse);
    this.booksList$.next({ ...booksResponse })
  }

  createShoppingCart(shoppingCartRequest:ShoppingCartRequest): Observable<ShoppingCartResponse> {
    return this._http.post<ShoppingCartResponse>(this.DATA_URL + "/shopping-cart/save", shoppingCartRequest) .pipe(catchError(error => of(error.url)));;
  }
}

