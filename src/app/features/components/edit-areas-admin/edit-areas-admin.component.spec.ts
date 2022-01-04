import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAreasAdminComponent } from './edit-areas-admin.component';

describe('EditAreasAdminComponent', () => {
  let component: EditAreasAdminComponent;
  let fixture: ComponentFixture<EditAreasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAreasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAreasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
