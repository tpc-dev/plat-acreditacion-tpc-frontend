import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEmpresaFormComponent } from './nueva-empresa-form.component';

describe('NuevaEmpresaFormComponent', () => {
  let component: NuevaEmpresaFormComponent;
  let fixture: ComponentFixture<NuevaEmpresaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaEmpresaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaEmpresaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
