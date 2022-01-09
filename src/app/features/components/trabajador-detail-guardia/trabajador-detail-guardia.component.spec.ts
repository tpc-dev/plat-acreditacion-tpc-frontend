import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadorDetailGuardiaComponent } from './trabajador-detail-guardia.component';

describe('TrabajadorDetailGuardiaComponent', () => {
  let component: TrabajadorDetailGuardiaComponent;
  let fixture: ComponentFixture<TrabajadorDetailGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadorDetailGuardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadorDetailGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
