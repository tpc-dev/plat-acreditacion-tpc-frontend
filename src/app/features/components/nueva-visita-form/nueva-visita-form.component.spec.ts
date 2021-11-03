import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaVisitaFormComponent } from './nueva-visita-form.component';

describe('NuevaVisitaFormComponent', () => {
  let component: NuevaVisitaFormComponent;
  let fixture: ComponentFixture<NuevaVisitaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaVisitaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaVisitaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
