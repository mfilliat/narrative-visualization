import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveSlideshowVerticalComponent } from './interactive-slideshow-vertical.component';

describe('InteractiveSlideshowVerticalComponent', () => {
  let component: InteractiveSlideshowVerticalComponent;
  let fixture: ComponentFixture<InteractiveSlideshowVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveSlideshowVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveSlideshowVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
