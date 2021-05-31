import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';
import { BooksResponse } from 'src/app/books-store/models/response/books-response';
import { BooksStoreService } from 'src/app/books-store/services/books-store.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.css']
})
export class BookViewComponent implements OnInit {
bookViewFrm: FormGroup;
bookViewed: BooksResponse;

  constructor(    
    private fb: FormBuilder,
    private booksStoreService:BooksStoreService,
    public dialogRef: MatDialogRef<BookViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
  ) { }

  ngOnInit(): void {
    this.getBookDetails();
    this.initializeForm();
  }

  initializeForm() {
    this.bookViewFrm = this.fb.group({
      bookCount: [null, { validators: [Validators.required] }],
    });
  }

  getBookDetails(){
    this.booksStoreService.getBookById(this.data.bookId).subscribe(book=>{
      console.log(book);
      
      this.bookViewed = book;
    })
  }

  onCancel(){

  }

  onAddToCart(){
    
  }

}
