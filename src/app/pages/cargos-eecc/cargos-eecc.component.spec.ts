import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosEeccComponent } from './cargos-eecc.component';

describe('CargosEeccComponent', () => {
  let component: CargosEeccComponent;
  let fixture: ComponentFixture<CargosEeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargosEeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargosEeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
