import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InduccionRiesgoPageComponent } from './induccion-riesgo-page.component';

describe('InduccionRiesgoPageComponent', () => {
  let component: InduccionRiesgoPageComponent;
  let fixture: ComponentFixture<InduccionRiesgoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InduccionRiesgoPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InduccionRiesgoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
