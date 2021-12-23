import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosEeccComponent } from './vehiculos-eecc.component';

describe('VehiculosEeccComponent', () => {
  let component: VehiculosEeccComponent;
  let fixture: ComponentFixture<VehiculosEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
