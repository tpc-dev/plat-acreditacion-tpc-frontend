import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoDetailComponent } from './contrato-detail.component';

describe('ContratoDetailComponent', () => {
  let component: ContratoDetailComponent;
  let fixture: ComponentFixture<ContratoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
