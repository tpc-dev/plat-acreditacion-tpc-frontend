import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorEmpresasEeccComponent } from './tabla-buscador-empresas-eecc.component';

describe('TablaBuscadorEmpresasEeccComponent', () => {
  let component: TablaBuscadorEmpresasEeccComponent;
  let fixture: ComponentFixture<TablaBuscadorEmpresasEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorEmpresasEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorEmpresasEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
