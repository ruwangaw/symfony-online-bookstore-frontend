import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookStoreComponent } from './pages/books-store/book-store.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { BooksResolver } from './services/resolver/books-resolver';
import { MstBooksCategoryResolver } from './services/resolver/mst-books-category-resolver';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: BookStoreComponent,
        resolve: {
          books: BooksResolver,
          booksCategories: MstBooksCategoryResolver
        }
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksStoreRoutingModule { }
