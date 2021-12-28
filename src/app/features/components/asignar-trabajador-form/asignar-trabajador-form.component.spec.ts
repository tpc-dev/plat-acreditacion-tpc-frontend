import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTrabajadorFormComponent } from './asignar-trabajador-form.component';

describe('NuevoTrabajadorFormComponent', () => {
  let component: AsignarTrabajadorFormComponent;
  let fixture: ComponentFixture<AsignarTrabajadorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarTrabajadorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarTrabajadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
