import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTrabajadorFrecuenteFormComponent } from './nuevo-trabajador-frecuente-form.component';

describe('NuevoTrabajadorFrecuenteFormComponent', () => {
  let component: NuevoTrabajadorFrecuenteFormComponent;
  let fixture: ComponentFixture<NuevoTrabajadorFrecuenteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoTrabajadorFrecuenteFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTrabajadorFrecuenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
