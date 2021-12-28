import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarVehiculoFormComponent } from './asignar-vehiculo-form.component';

describe('AsignarVehiculoFormComponent', () => {
  let component: AsignarVehiculoFormComponent;
  let fixture: ComponentFixture<AsignarVehiculoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarVehiculoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarVehiculoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
