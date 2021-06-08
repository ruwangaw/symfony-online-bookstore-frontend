import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionStorageService } from 'ngx-webstorage';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ShoppingCartBooksRequest } from '../../models/request/shopping-cart-books-request';
import { ShoppingCartDiscountsRequest } from '../../models/request/shopping-cart-discounts-request';
import { ShoppingCartRequest } from '../../models/request/shopping-cart-request';
import { UserRequest } from '../../models/request/user-request';
import { BooksResponse } from '../../models/response/books-response';
import { MstBooksCategoryResponse } from '../../models/response/mst-books-category-response';
import { ShoppingCartBooks } from '../../models/shopping-cart-book';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  netTotalAmmount: number = 0.00;
  cartSubscription: Subscription;
  shoppingCartBooks: ShoppingCartBooks[] = [];
  isCheckoutBtnDisabled:boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ShoppingCartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shoppingCartService: ShoppingCartService,
    private sessionStorage: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.getShoppingCart();
  }

  ngOnDestroy(): void {
    typeof this.cartSubscription !== 'undefined' ? this.cartSubscription.unsubscribe() : this.cartSubscription;
  }

  getShoppingCart() {
    this.cartSubscription = this.shoppingCartService.cartState$.subscribe(cart => {
      
      if (typeof cart !== 'undefined' && cart !== null) {        
        this.shoppingCartBooks = cart;
        this.calculateShopingCartValues();
      }
      else {
        this.shoppingCartBooks = JSON.parse(this.sessionStorage.retrieve(environment.SESSION_STORAGE_SHOPPING_CART));
      }
    });
    this.isCheckoutBtnDisabled = false;
    console.log(this.shoppingCartBooks);
  }

  calculateShopingCartValues() {
    this.shoppingCartBooks.forEach(cartItem => {
      this.netTotalAmmount += cartItem.netBookAmount;
    });
  }

  onClickRemoveItemFromCart(book) {
    this.shoppingCartService.removeCartItem(book);
  }

  onEmptyCart() {
    this.shoppingCartService.clearCart();
    this.netTotalAmmount = 0;
    this.isCheckoutBtnDisabled = true;
  }

  onCheckoutCart() {
    let shoppingCart = new ShoppingCartRequest();
    shoppingCart.shoppingCartBooks = [new ShoppingCartBooksRequest()];
    shoppingCart.shoppingCartDiscounts = [new ShoppingCartDiscountsRequest()];
    shoppingCart.user = new UserRequest();

    shoppingCart.totalAmount = 0.00;
    shoppingCart.totalGrossAmount = 0.00;
    shoppingCart.discountAmount = 0.00;

    this.shoppingCartBooks.forEach((cartItem, key) => {
      shoppingCart.shoppingCartBooks[key] = new ShoppingCartBooksRequest();
      shoppingCart.shoppingCartBooks[key].book = new BooksResponse();
      shoppingCart.shoppingCartBooks[key].book.category = new MstBooksCategoryResponse();

      shoppingCart.shoppingCartBooks[key].book.id = cartItem.book.id;
      shoppingCart.shoppingCartBooks[key].book.isbn = cartItem.book.isbn;
      shoppingCart.shoppingCartBooks[key].book.title = cartItem.book.title;
      shoppingCart.shoppingCartBooks[key].book.category.id = cartItem.book.category.id;
      shoppingCart.shoppingCartBooks[key].book.category.code = cartItem.book.category.code;
      shoppingCart.shoppingCartBooks[key].book.category.name = cartItem.book.category.name;

      shoppingCart.shoppingCartBooks[key].calculated_price = cartItem.netBookAmount;
      shoppingCart.shoppingCartBooks[key].item_count = cartItem.bookCount;

      shoppingCart.totalAmount += cartItem.netBookAmount;
      shoppingCart.totalGrossAmount = cartItem.grossBookAmount;
      shoppingCart.discountAmount = 0;
    });

    shoppingCart.user.id = 1
    shoppingCart.user.name = "Ruwan Gawarammana";
    shoppingCart.user.username = "RuGawarammana";

    this.shoppingCartService.createShoppingCart(shoppingCart).subscribe(response=>{
      console.log(response);      
    });
  }

}
