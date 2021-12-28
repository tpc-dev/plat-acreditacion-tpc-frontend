import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorTrabajadoresEeccComponent } from './tabla-buscador-trabajadores-eecc.component';

describe('TablaBuscadorTrabajadoresEeccComponent', () => {
  let component: TablaBuscadorTrabajadoresEeccComponent;
  let fixture: ComponentFixture<TablaBuscadorTrabajadoresEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorTrabajadoresEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorTrabajadoresEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
