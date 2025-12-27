import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTopconsumersComponent } from './grid-topconsumers.component';

describe('GridTopconsumersComponent', () => {
  let component: GridTopconsumersComponent;
  let fixture: ComponentFixture<GridTopconsumersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridTopconsumersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridTopconsumersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
