import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicuentaPageComponent } from './micuenta-page.component';

describe('MicuentaPageComponent', () => {
  let component: MicuentaPageComponent;
  let fixture: ComponentFixture<MicuentaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicuentaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicuentaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
