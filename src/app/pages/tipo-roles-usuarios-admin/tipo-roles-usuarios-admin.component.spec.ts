import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoRolesUsuariosAdminComponent } from './tipo-roles-usuarios-admin.component';

describe('TipoRolesUsuariosAdminComponent', () => {
  let component: TipoRolesUsuariosAdminComponent;
  let fixture: ComponentFixture<TipoRolesUsuariosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoRolesUsuariosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoRolesUsuariosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
