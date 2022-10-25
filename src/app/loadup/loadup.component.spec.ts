import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadupComponent } from './loadup.component';

describe('LoadupComponent', () => {
  let component: LoadupComponent;
  let fixture: ComponentFixture<LoadupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
