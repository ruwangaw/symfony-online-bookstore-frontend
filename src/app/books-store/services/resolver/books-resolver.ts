import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BooksRequest } from '../../models/request/books-request';
import { BooksStoreService } from '../books-store.service';

@Injectable({
    providedIn: 'root'
})

export class BooksResolver implements Resolve<any>
{
    constructor(
        private booksStoreService: BooksStoreService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let booksRequest = new BooksRequest();
        booksRequest.id = null;
        booksRequest.isbn = null;
        booksRequest.title = null;
        booksRequest.categoryCode = null;
        return this.booksStoreService.getBooks(booksRequest);
    }
}
