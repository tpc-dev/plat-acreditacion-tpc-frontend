import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosGestionTpcComponent } from './contratos-gestion-tpc.component';

describe('ContratosGestionTpcComponent', () => {
  let component: ContratosGestionTpcComponent;
  let fixture: ComponentFixture<ContratosGestionTpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratosGestionTpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosGestionTpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
