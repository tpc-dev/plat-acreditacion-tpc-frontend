import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaBuscadorTiposRolesComponent } from './tabla-buscador-tipos-roles.component';

describe('TablaBuscadorTiposRolesComponent', () => {
  let component: TablaBuscadorTiposRolesComponent;
  let fixture: ComponentFixture<TablaBuscadorTiposRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaBuscadorTiposRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaBuscadorTiposRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
