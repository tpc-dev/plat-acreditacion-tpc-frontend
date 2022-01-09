import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorTrabajadorFrecuenteComponent } from './tabla-buscador-trabajador-frecuente.component';

describe('TablaBuscadorTrabajadorFrecuenteComponent', () => {
  let component: TablaBuscadorTrabajadorFrecuenteComponent;
  let fixture: ComponentFixture<TablaBuscadorTrabajadorFrecuenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorTrabajadorFrecuenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorTrabajadorFrecuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
