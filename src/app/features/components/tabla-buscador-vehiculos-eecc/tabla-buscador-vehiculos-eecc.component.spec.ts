import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorVehiculosEeccComponent } from './tabla-buscador-vehiculos-eecc.component';

describe('TablaBuscadorVehiculosEeccComponent', () => {
  let component: TablaBuscadorVehiculosEeccComponent;
  let fixture: ComponentFixture<TablaBuscadorVehiculosEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorVehiculosEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorVehiculosEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
