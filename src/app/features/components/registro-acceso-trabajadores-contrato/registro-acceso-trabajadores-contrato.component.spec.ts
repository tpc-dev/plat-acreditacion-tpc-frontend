import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAccesoTrabajadoresContratoComponent } from './registro-acceso-trabajadores-contrato.component';

describe('RegistroAccesoTrabajadoresContratoComponent', () => {
  let component: RegistroAccesoTrabajadoresContratoComponent;
  let fixture: ComponentFixture<RegistroAccesoTrabajadoresContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAccesoTrabajadoresContratoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAccesoTrabajadoresContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
