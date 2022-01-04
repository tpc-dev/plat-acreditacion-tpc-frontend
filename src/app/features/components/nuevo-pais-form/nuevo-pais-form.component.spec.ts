import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPaisFormComponent } from './nuevo-pais-form.component';

describe('NuevoPaisFormComponent', () => {
  let component: NuevoPaisFormComponent;
  let fixture: ComponentFixture<NuevoPaisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoPaisFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoPaisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
