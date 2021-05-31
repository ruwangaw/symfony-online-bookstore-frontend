import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksStoreRoutingModule } from './books-store-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BooksStoreListComponent } from './pages/books-store/books-store-list/books-store-list.component';
import { BookViewComponent } from './pages/popups/book-view/book-view.component';
import { BookStoreComponent } from './pages/books-store/book-store.component';
import { BooksStoreViewComponent } from './pages/books-store/books-store-view/books-store-view.component';
import { BooksStoreSearchComponent } from './pages/books-store/books-store-search/books-store-search.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { LayoutComponent } from './pages/layout/layout.component';


@NgModule({
  declarations: [
    BookStoreComponent,
    BooksStoreListComponent,
    BooksStoreViewComponent,
    BooksStoreSearchComponent,
    BookViewComponent,
    ShoppingCartComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    BooksStoreRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    BookViewComponent
  ],
})
export class BooksStoreModule { }
