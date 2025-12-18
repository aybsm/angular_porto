import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSymbolComponent } from './price-symbol.component';

describe('PriceSymbolComponent', () => {
  let component: PriceSymbolComponent;
  let fixture: ComponentFixture<PriceSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceSymbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
