import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosAdminComponent } from './contratos-admin.component';

describe('ContratosAdminComponent', () => {
  let component: ContratosAdminComponent;
  let fixture: ComponentFixture<ContratosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
