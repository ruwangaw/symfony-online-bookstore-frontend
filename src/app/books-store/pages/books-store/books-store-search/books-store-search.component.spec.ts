import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksStoreSearchComponent } from './books-store-search.component';

describe('BooksStoreSearchComponent', () => {
  let component: BooksStoreSearchComponent;
  let fixture: ComponentFixture<BooksStoreSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksStoreSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksStoreSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
