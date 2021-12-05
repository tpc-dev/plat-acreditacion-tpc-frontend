import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleItemCarpetaArranqueAdminComponent } from './detalle-item-carpeta-arranque-admin.component';

describe('DetalleItemCarpetaArranqueAdminComponent', () => {
  let component: DetalleItemCarpetaArranqueAdminComponent;
  let fixture: ComponentFixture<DetalleItemCarpetaArranqueAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleItemCarpetaArranqueAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleItemCarpetaArranqueAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
