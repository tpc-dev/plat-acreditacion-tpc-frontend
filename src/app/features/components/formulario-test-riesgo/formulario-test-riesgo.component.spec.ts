import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTestRiesgoComponent } from './formulario-test-riesgo.component';

describe('FormularioTestRiesgoComponent', () => {
  let component: FormularioTestRiesgoComponent;
  let fixture: ComponentFixture<FormularioTestRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioTestRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTestRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
