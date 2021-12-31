import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresTpcAdminComponent } from './trabajadores-tpc-admin.component';

describe('TrabajadoresTpcAdminComponent', () => {
  let component: TrabajadoresTpcAdminComponent;
  let fixture: ComponentFixture<TrabajadoresTpcAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajadoresTpcAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajadoresTpcAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
