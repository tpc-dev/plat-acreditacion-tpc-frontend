import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoJornadaFormComponent } from './nuevo-jornada-form.component';

describe('NuevoJornadaFormComponent', () => {
  let component: NuevoJornadaFormComponent;
  let fixture: ComponentFixture<NuevoJornadaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoJornadaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoJornadaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
