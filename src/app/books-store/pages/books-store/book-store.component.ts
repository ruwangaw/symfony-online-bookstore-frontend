import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MstBooksCategoryResponse } from '../../models/response/mst-books-category-response';
import { ShoppingCartBooks } from '../../models/shopping-cart-book';
import { BooksStoreService } from '../../services/books-store.service';
import { SharedService } from '../../services/shared.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-book-store',
  templateUrl: './book-store.component.html',
  styleUrls: ['./book-store.component.css']
})
/**
 * The parent component dedicated for the Books init page.
 * 
 * 
 */
export class BookStoreComponent implements OnInit {

  selectedCategory: MstBooksCategoryResponse;
  title: string = 'Symfony Online Books Store';
  cartSubscription: Subscription;
  categories: MstBooksCategoryResponse[] = [];
  shoppingCartBooks: ShoppingCartBooks[] = [];
  totalBookCount: number = 0;

  constructor(
    private sharedService: SharedService,
    private booksStoreService: BooksStoreService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMstBooksCategories();
    this.getShoppingCart();
  }

  /**
   * gets all the master books categories to be displayed  via a resolver.
   * once the route is executed then all the master books categories are acquired.
   */
  getMstBooksCategories() {
    this.route.data.pipe(map(data => data.booksCategories)).subscribe(data => {
      if (typeof data !== 'undefined') {
        this.categories = data;
      }
    });
  }
  /**
   * 
   * @param $event Menu category selection event
   */
  onMenuSelected($event) {
    if ($event !== -1) {
      this.booksStoreService.onCategoryMenuSelected($event);
    }
    else {
      this.booksStoreService.onCategoryMenuSelected(new MstBooksCategoryResponse());
    }
  }

  onShoppingCartClick() {
      const dialogRef = this.dialog.open(ShoppingCartComponent, {
        width: '800px',
        height: 'inherit',
        disableClose: true,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed',result);
      });
  }

  getShoppingCart() {

    this.cartSubscription = this.shoppingCartService.cartState$.subscribe(cart => {
      let totalBookCount = 0;
      this.shoppingCartBooks = cart;
      this.shoppingCartBooks.forEach(cart => {
        totalBookCount += cart.bookCount;
      });
      this.totalBookCount = totalBookCount;
    });
    console.log(this.shoppingCartBooks);
  }

}
