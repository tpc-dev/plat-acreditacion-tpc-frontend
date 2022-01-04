import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosAdminTpcComponent } from './vehiculos-admin-tpc.component';

describe('VehiculosAdminTpcComponent', () => {
  let component: VehiculosAdminTpcComponent;
  let fixture: ComponentFixture<VehiculosAdminTpcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosAdminTpcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosAdminTpcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
