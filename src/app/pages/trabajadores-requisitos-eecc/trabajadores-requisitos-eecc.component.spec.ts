import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresRequisitosEeccComponent } from './trabajadores-requisitos-eecc.component';

describe('TrabajadoresRequisitosEeccComponent', () => {
  let component: TrabajadoresRequisitosEeccComponent;
  let fixture: ComponentFixture<TrabajadoresRequisitosEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadoresRequisitosEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresRequisitosEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
