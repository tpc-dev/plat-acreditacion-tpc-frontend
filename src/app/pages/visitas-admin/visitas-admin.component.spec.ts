import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitasAdminComponent } from './visitas-admin.component';

describe('VisitasAdminComponent', () => {
  let component: VisitasAdminComponent;
  let fixture: ComponentFixture<VisitasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
