import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasGuardiaComponent } from './empresas-guardia.component';

describe('EmpresasGuardiaComponent', () => {
  let component: EmpresasGuardiaComponent;
  let fixture: ComponentFixture<EmpresasGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasGuardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
