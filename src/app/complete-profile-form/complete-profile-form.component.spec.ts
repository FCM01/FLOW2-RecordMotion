import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteProfileFormComponent } from './complete-profile-form.component';

describe('CompleteProfileFormComponent', () => {
  let component: CompleteProfileFormComponent;
  let fixture: ComponentFixture<CompleteProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteProfileFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
