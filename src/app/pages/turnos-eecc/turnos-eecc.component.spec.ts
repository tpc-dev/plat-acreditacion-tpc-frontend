import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosEeccComponent } from './turnos-eecc.component';

describe('TurnosEeccComponent', () => {
  let component: TurnosEeccComponent;
  let fixture: ComponentFixture<TurnosEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnosEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
