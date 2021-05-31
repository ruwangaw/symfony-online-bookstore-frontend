import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BooksRequest } from '../../models/request/books-request';
import { BooksStoreService } from '../books-store.service';
import { SharedService } from '../shared.service';

@Injectable({
    providedIn: 'root'
})

export class MstBooksCategoryResolver implements Resolve<any>
{
    constructor(
        private sharedService: SharedService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.sharedService.getMstBooksCategories();
    }
}