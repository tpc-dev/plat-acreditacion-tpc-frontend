import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosContratoEeccComponent } from './eventos-contrato-eecc.component';

describe('EventosContratoEeccComponent', () => {
  let component: EventosContratoEeccComponent;
  let fixture: ComponentFixture<EventosContratoEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventosContratoEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosContratoEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
