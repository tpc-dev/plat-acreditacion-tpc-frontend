import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorPaisesComponent } from './tabla-buscador-paises.component';

describe('TablaBuscadorPaisesComponent', () => {
  let component: TablaBuscadorPaisesComponent;
  let fixture: ComponentFixture<TablaBuscadorPaisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorPaisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorPaisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
