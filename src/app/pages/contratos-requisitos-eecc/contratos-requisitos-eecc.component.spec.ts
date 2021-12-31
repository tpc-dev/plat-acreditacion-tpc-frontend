import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosRequisitosEeccComponent } from './contratos-requisitos-eecc.component';

describe('ContratosRequisitosEeccComponent', () => {
  let component: ContratosRequisitosEeccComponent;
  let fixture: ComponentFixture<ContratosRequisitosEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratosRequisitosEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosRequisitosEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
