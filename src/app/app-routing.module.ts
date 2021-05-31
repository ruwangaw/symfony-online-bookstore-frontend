import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes =
  [
    {
      path: '', loadChildren: () => import('./books-store/books-store.module').then(m => m.BooksStoreModule)
    },
    {
      path: 'books-store', loadChildren: () => import('./books-store/books-store.module').then(m => m.BooksStoreModule)
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
