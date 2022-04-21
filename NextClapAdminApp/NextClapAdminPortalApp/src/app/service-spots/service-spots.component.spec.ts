import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSpotsComponent } from './service-spots.component';

describe('ServiceSpotsComponent', () => {
  let component: ServiceSpotsComponent;
  let fixture: ComponentFixture<ServiceSpotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceSpotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSpotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
