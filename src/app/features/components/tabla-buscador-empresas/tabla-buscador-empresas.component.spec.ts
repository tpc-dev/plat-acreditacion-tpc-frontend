import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorEmpresasComponent } from './tabla-buscador-empresas.component';

describe('TablaBuscadorEmpresasComponent', () => {
  let component: TablaBuscadorEmpresasComponent;
  let fixture: ComponentFixture<TablaBuscadorEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorEmpresasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
