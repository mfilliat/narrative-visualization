import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveSlideshowComponent } from './interactive-slideshow.component';

describe('InteractiveSlideshowComponent', () => {
  let component: InteractiveSlideshowComponent;
  let fixture: ComponentFixture<InteractiveSlideshowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveSlideshowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
