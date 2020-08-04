import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliDefaultComponent } from './cli-default.component';

describe('CliDefaultComponent', () => {
  let component: CliDefaultComponent;
  let fixture: ComponentFixture<CliDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'narrative-visualization'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('narrative-visualization');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('narrative-visualization app is running!');
  });
});
