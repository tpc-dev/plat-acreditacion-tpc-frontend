import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTrabajadorFormComponent } from './nuevo-trabajador-form.component';

describe('NuevoTrabajadorFormComponent', () => {
  let component: NuevoTrabajadorFormComponent;
  let fixture: ComponentFixture<NuevoTrabajadorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoTrabajadorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTrabajadorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
