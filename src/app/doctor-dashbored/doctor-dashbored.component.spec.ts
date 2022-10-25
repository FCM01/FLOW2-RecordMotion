import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDashboredComponent } from './doctor-dashbored.component';

describe('DoctorDashboredComponent', () => {
  let component: DoctorDashboredComponent;
  let fixture: ComponentFixture<DoctorDashboredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDashboredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDashboredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
