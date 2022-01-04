import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosAdminEeccComponent } from './vehiculos-admin-eecc.component';

describe('VehiculosAdminEeccComponent', () => {
  let component: VehiculosAdminEeccComponent;
  let fixture: ComponentFixture<VehiculosAdminEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosAdminEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosAdminEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
