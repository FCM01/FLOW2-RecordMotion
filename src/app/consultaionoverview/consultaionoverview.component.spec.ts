import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaionoverviewComponent } from './consultaionoverview.component';

describe('ConsultaionoverviewComponent', () => {
  let component: ConsultaionoverviewComponent;
  let fixture: ComponentFixture<ConsultaionoverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaionoverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaionoverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
