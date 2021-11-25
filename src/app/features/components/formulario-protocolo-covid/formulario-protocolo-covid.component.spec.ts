import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProtocoloCovidComponent } from './formulario-protocolo-covid.component';

describe('FormularioProtocoloCovidComponent', () => {
  let component: FormularioProtocoloCovidComponent;
  let fixture: ComponentFixture<FormularioProtocoloCovidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioProtocoloCovidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioProtocoloCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
