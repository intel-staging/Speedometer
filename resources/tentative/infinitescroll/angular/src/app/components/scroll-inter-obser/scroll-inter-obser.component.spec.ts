import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollInterObserComponent } from './scroll-inter-obser.component';

describe('ScrollInterObserComponent', () => {
  let component: ScrollInterObserComponent;
  let fixture: ComponentFixture<ScrollInterObserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollInterObserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrollInterObserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
