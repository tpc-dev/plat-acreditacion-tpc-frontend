import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciasAdminComponent } from './gerencias-admin.component';

describe('GerenciasAdminComponent', () => {
  let component: GerenciasAdminComponent;
  let fixture: ComponentFixture<GerenciasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
