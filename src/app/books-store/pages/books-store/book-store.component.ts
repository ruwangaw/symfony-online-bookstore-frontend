import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MstBooksCategoryResponse } from '../../models/response/mst-books-category-response';
import { BooksStoreService } from '../../services/books-store.service';
import { SharedService } from '../../services/shared.service';

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
  categories: MstBooksCategoryResponse[] = [];

  constructor(
    private sharedService: SharedService,
    private booksStoreService: BooksStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMstBooksCategories();
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

  onShoppingCartClick(){
    this.router.navigate(['shopping-cart'])
  }

}
