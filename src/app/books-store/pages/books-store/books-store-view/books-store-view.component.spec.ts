import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksStoreViewComponent } from './books-store-view.component';

describe('BooksStoreViewComponent', () => {
  let component: BooksStoreViewComponent;
  let fixture: ComponentFixture<BooksStoreViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksStoreViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksStoreViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
