import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooksRequest } from '../../../models/request/books-request';
import { BooksResponse } from '../../../models/response/books-response';
import { BooksStoreService } from '../../../services/books-store.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { BookViewComponent } from '../../popups/book-view/book-view.component';

@Component({
  selector: 'app-books-store-list',
  templateUrl: './books-store-list.component.html',
  styleUrls: ['./books-store-list.component.css']
})
/**
 * This component class is solely responsible for the data flow of the 
 * books list shown
 * 
 * this is a child component of the book-store.component
 */
export class BooksStoreListComponent implements OnInit, OnDestroy {

  @Input() childCategory = null;
  books: BooksResponse[] = [];
  subscriptionOne: Subscription;

  constructor(
    private booksStoreService: BooksStoreService,
    private shoppingCartService:ShoppingCartService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAllBooks();

    this.subscriptionOne = this.booksStoreService.selectedMstBookCategorySubject.subscribe(category => {
      let booksSearchObj = new BooksRequest();     

        booksSearchObj.categoryCode = category.code;      

      this.booksStoreService.getBooks(booksSearchObj).subscribe(books=>{
        this.books = books;
        // this.shoppingCartService.getItems(this.books);
      });
    });
  }

  ngOnDestroy(): void {
    if (typeof this.subscriptionOne !== 'undefined') {
      this.subscriptionOne.unsubscribe();
    }

  }

   /**
   * gets all the Archives available to be displayed  via a resolver.
   * once the route is executed then all the books are acquired.
   * 
   * need to introduce pagination
   */
  getAllBooks() {
    this.route.data.pipe(map(data => data.books)).subscribe(data => {
      if (typeof data !== 'undefined') {
        this.books = data;
        this.shoppingCartService.getItems(data);
      }
    });
  }

  /**
   * 
   * @param book view book click method
   */
  onClickviewBook(book){
    const dialogRef = this.dialog.open(BookViewComponent, {
      width: '800px',
      height: '400px',
      disableClose: true,
      data: {
        bookId: book.id
      }
    });
  }

  /**
   * 
   * @param book add to shopping cart click method
   */
  onClickAddToShoppingCart(book){
    this.shoppingCartService.addCartItem(book)
  }

  onClickRemoveFromShoppingCart(book){
    this.shoppingCartService.removeCartItem(book.id);
  }

}
