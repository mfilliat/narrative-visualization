import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartCurrWeekComponent } from './donut-chart-curr-week.component';

describe('DonutChartComponent', () => {
  let component: DonutChartCurrWeekComponent;
  let fixture: ComponentFixture<DonutChartCurrWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonutChartCurrWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonutChartCurrWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
