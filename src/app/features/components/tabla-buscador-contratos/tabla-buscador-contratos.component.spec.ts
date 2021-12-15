import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorContratosComponent } from './tabla-buscador-contratos.component';

describe('TablaBuscadorContratosComponent', () => {
  let component: TablaBuscadorContratosComponent;
  let fixture: ComponentFixture<TablaBuscadorContratosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorContratosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
