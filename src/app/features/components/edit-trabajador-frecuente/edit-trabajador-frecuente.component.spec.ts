import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrabajadorFrecuenteComponent } from './edit-trabajador-frecuente.component';

describe('EditTrabajadorFrecuenteComponent', () => {
  let component: EditTrabajadorFrecuenteComponent;
  let fixture: ComponentFixture<EditTrabajadorFrecuenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTrabajadorFrecuenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTrabajadorFrecuenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
