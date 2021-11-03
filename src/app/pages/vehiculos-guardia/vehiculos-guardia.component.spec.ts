import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosGuardiaComponent } from './vehiculos-guardia.component';

describe('VehiculosGuardiaComponent', () => {
  let component: VehiculosGuardiaComponent;
  let fixture: ComponentFixture<VehiculosGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosGuardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
