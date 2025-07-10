import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourdetailsComponent } from './tourdetails.component';

describe('TourdetailsComponent', () => {
  let component: TourdetailsComponent;
  let fixture: ComponentFixture<TourdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourdetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
