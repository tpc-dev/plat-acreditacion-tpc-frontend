import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosAdminComponent } from './vehiculos-admin.component';

describe('VehiculosAdminComponent', () => {
  let component: VehiculosAdminComponent;
  let fixture: ComponentFixture<VehiculosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
