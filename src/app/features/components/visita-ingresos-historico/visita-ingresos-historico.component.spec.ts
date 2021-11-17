import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaIngresosHistoricoComponent } from './visita-ingresos-historico.component';

describe('VisitaIngresosHistoricoComponent', () => {
  let component: VisitaIngresosHistoricoComponent;
  let fixture: ComponentFixture<VisitaIngresosHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitaIngresosHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaIngresosHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
