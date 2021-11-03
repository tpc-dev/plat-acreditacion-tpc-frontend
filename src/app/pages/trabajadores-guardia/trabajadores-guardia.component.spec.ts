import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresGuardiaComponent } from './trabajadores-guardia.component';

describe('TrabajadoresGuardiaComponent', () => {
  let component: TrabajadoresGuardiaComponent;
  let fixture: ComponentFixture<TrabajadoresGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadoresGuardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
