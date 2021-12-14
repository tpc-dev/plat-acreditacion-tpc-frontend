import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaGerenciaFormComponent } from './nueva-gerencia-form.component';

describe('NuevaGerenciaFormComponent', () => {
  let component: NuevaGerenciaFormComponent;
  let fixture: ComponentFixture<NuevaGerenciaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaGerenciaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaGerenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
