import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoTurnoFormComponent } from './nuevo-turno-form.component';

describe('NuevoTurnoFormComponent', () => {
  let component: NuevoTurnoFormComponent;
  let fixture: ComponentFixture<NuevoTurnoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoTurnoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoTurnoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
