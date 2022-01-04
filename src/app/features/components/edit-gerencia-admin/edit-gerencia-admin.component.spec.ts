import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGerenciaAdminComponent } from './edit-gerencia-admin.component';

describe('EditGerenciaAdminComponent', () => {
  let component: EditGerenciaAdminComponent;
  let fixture: ComponentFixture<EditGerenciaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGerenciaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGerenciaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
