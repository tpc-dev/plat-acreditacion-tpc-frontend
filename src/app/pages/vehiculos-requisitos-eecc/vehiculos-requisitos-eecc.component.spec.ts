import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosRequisitosEeccComponent } from './vehiculos-requisitos-eecc.component';

describe('VehiculosRequisitosEeccComponent', () => {
  let component: VehiculosRequisitosEeccComponent;
  let fixture: ComponentFixture<VehiculosRequisitosEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosRequisitosEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosRequisitosEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
