import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAccesoVehiculoContratoComponent } from './registro-acceso-vehiculo-contrato.component';

describe('RegistroAccesoVehiculoContratoComponent', () => {
  let component: RegistroAccesoVehiculoContratoComponent;
  let fixture: ComponentFixture<RegistroAccesoVehiculoContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAccesoVehiculoContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAccesoVehiculoContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
