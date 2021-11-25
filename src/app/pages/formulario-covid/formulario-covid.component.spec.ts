import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCovidComponent } from './formulario-covid.component';

describe('FormularioCovidComponent', () => {
  let component: FormularioCovidComponent;
  let fixture: ComponentFixture<FormularioCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioCovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
