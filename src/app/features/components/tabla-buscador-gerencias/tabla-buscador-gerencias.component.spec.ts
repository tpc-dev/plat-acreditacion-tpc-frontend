import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorGerenciasComponent } from './tabla-buscador-gerencias.component';

describe('TablaBuscadorGerenciasComponent', () => {
  let component: TablaBuscadorGerenciasComponent;
  let fixture: ComponentFixture<TablaBuscadorGerenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorGerenciasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorGerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
