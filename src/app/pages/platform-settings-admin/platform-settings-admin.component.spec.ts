import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformSettingsAdminComponent } from './platform-settings-admin.component';

describe('PlatformSettingsAdminComponent', () => {
  let component: PlatformSettingsAdminComponent;
  let fixture: ComponentFixture<PlatformSettingsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformSettingsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformSettingsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
