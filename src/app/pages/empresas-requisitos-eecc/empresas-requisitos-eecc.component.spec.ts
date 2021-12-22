import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasRequisitosEeccComponent } from './empresas-requisitos-eecc.component';

describe('EmpresasRequisitosEeccComponent', () => {
  let component: EmpresasRequisitosEeccComponent;
  let fixture: ComponentFixture<EmpresasRequisitosEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasRequisitosEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasRequisitosEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
