import { CollectionViewer, DataSource } from '@angular/cdk/collections'
import { AnyCnameRecord } from 'dns';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { BooksResponse } from '../../models/response/books-response';
import { BooksStoreService } from '../books-store.service';

export class BooksDatasource implements DataSource<any>{

    booksDataSubject = new BehaviorSubject<BooksResponse[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private dataListLengthSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public length$ = this.dataListLengthSubject.asObservable();

    constructor(private booksStoreService: BooksStoreService) { }

    connect(collectionViewer: CollectionViewer): Observable<BooksResponse[]> {
        console.log('Connecting data source');
        return this.booksDataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.booksDataSubject.complete();
        this.loadingSubject.complete();
        this.dataListLengthSubject.complete();
    }

    loadBirthCertificates(birthCertificateSearch) {
        this.loadingSubject.next(true);
        this.booksStoreService
            // .getBirthCertificate(birthCertificateSearch)
            .getAll()
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(birthCertificates => {
                this.dataListLengthSubject.next(birthCertificates['meta'].totalRecords);
                this.booksDataSubject
                    .next(birthCertificates);
            });
    }
}