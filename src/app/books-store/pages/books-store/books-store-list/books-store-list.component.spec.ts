import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksStoreListComponent } from './books-store-list.component';

describe('BooksStoreListComponent', () => {
  let component: BooksStoreListComponent;
  let fixture: ComponentFixture<BooksStoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksStoreListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksStoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
