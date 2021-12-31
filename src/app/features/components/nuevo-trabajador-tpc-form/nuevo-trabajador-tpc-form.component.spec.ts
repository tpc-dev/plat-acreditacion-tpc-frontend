import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTrabajadorTpcFormComponent } from './nuevo-trabajador-tpc-form.component';

describe('NuevoTrabajadorTpcFormComponent', () => {
  let component: NuevoTrabajadorTpcFormComponent;
  let fixture: ComponentFixture<NuevoTrabajadorTpcFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoTrabajadorTpcFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTrabajadorTpcFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
