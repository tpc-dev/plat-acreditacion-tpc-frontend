import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasGuardiaComponent } from './visitas-guardia.component';

describe('VisitasGuardiaComponent', () => {
  let component: VisitasGuardiaComponent;
  let fixture: ComponentFixture<VisitasGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitasGuardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
