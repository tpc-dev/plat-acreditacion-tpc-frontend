import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresasAdceeccComponent } from './empresas-adceecc.component';

describe('EmpresasAdceeccComponent', () => {
  let component: EmpresasAdceeccComponent;
  let fixture: ComponentFixture<EmpresasAdceeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpresasAdceeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasAdceeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
