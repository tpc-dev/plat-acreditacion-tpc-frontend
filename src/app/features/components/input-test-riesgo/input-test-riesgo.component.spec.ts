import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTestRiesgoComponent } from './input-test-riesgo.component';

describe('InputTestRiesgoComponent', () => {
  let component: InputTestRiesgoComponent;
  let fixture: ComponentFixture<InputTestRiesgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputTestRiesgoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTestRiesgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
