import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySalesComponent } from './history-sales.component';

describe('HistorySalesComponent', () => {
  let component: HistorySalesComponent;
  let fixture: ComponentFixture<HistorySalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorySalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorySalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
