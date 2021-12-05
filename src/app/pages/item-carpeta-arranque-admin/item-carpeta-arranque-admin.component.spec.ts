import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCarpetaArranqueAdminComponent } from './item-carpeta-arranque-admin.component';

describe('ItemCarpetaArranqueAdminComponent', () => {
  let component: ItemCarpetaArranqueAdminComponent;
  let fixture: ComponentFixture<ItemCarpetaArranqueAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemCarpetaArranqueAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCarpetaArranqueAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
