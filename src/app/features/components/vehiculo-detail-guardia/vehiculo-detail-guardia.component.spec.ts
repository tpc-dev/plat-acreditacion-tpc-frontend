import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoDetailGuardiaComponent } from './vehiculo-detail-guardia.component';

describe('VehiculoDetailGuardiaComponent', () => {
  let component: VehiculoDetailGuardiaComponent;
  let fixture: ComponentFixture<VehiculoDetailGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculoDetailGuardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculoDetailGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
