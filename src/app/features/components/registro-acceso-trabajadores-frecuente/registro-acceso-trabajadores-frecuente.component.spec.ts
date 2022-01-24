import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAccesoTrabajadoresFrecuenteComponent } from './registro-acceso-trabajadores-frecuente.component';

describe('RegistroAccesoTrabajadoresFrecuenteComponent', () => {
  let component: RegistroAccesoTrabajadoresFrecuenteComponent;
  let fixture: ComponentFixture<RegistroAccesoTrabajadoresFrecuenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroAccesoTrabajadoresFrecuenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAccesoTrabajadoresFrecuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
