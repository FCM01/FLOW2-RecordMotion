import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotpasswordVerifyComponent } from './forgotpassword-verify.component';

describe('ForgotpasswordVerifyComponent', () => {
  let component: ForgotpasswordVerifyComponent;
  let fixture: ComponentFixture<ForgotpasswordVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpasswordVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotpasswordVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
