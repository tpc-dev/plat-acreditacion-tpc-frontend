import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarContratoStepperComponent } from './ingresar-contrato-stepper.component';

describe('IngresarContratoStepperComponent', () => {
  let component: IngresarContratoStepperComponent;
  let fixture: ComponentFixture<IngresarContratoStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarContratoStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarContratoStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
