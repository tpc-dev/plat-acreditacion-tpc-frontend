import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoCargoFormComponent } from './nuevo-cargo-form.component';

describe('NuevoCargoFormComponent', () => {
  let component: NuevoCargoFormComponent;
  let fixture: ComponentFixture<NuevoCargoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoCargoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoCargoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
