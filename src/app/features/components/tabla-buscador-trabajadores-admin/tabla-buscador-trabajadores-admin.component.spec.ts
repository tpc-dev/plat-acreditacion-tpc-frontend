import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorTrabajadoresAdminComponent } from './tabla-buscador-trabajadores-admin.component';

describe('TablaBuscadorTrabajadoresAdminComponent', () => {
  let component: TablaBuscadorTrabajadoresAdminComponent;
  let fixture: ComponentFixture<TablaBuscadorTrabajadoresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorTrabajadoresAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorTrabajadoresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
