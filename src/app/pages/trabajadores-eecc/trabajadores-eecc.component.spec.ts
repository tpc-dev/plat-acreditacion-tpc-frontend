import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresEeccComponent } from './trabajadores-eecc.component';

describe('TrabajadoresEeccComponent', () => {
  let component: TrabajadoresEeccComponent;
  let fixture: ComponentFixture<TrabajadoresEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadoresEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
