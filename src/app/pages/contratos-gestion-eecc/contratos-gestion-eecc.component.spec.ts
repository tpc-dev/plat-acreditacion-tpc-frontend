import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosGestionEeccComponent } from './contratos-gestion-eecc.component';

describe('ContratosGestionEeccComponent', () => {
  let component: ContratosGestionEeccComponent;
  let fixture: ComponentFixture<ContratosGestionEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratosGestionEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosGestionEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
