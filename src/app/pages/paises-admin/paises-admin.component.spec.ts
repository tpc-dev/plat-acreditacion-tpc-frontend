import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisesAdminComponent } from './paises-admin.component';

describe('PaisesAdminComponent', () => {
  let component: PaisesAdminComponent;
  let fixture: ComponentFixture<PaisesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaisesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
