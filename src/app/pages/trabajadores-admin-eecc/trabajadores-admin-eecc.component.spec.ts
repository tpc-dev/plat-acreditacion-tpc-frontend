import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresAdminEeccComponent } from './trabajadores-admin-eecc.component';

describe('TrabajadoresAdminEeccComponent', () => {
  let component: TrabajadoresAdminEeccComponent;
  let fixture: ComponentFixture<TrabajadoresAdminEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadoresAdminEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresAdminEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
