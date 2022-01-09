import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombradaAdminComponent } from './nombrada-admin.component';

describe('NombradaAdminComponent', () => {
  let component: NombradaAdminComponent;
  let fixture: ComponentFixture<NombradaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NombradaAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NombradaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
