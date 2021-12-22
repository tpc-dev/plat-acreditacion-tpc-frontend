import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosAdceeccComponent } from './contratos-adceecc.component';

describe('ContratosAdceeccComponent', () => {
  let component: ContratosAdceeccComponent;
  let fixture: ComponentFixture<ContratosAdceeccComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratosAdceeccComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosAdceeccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
