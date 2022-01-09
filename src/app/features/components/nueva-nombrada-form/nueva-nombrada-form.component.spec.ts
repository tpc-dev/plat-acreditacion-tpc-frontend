import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaNombradaFormComponent } from './nueva-nombrada-form.component';

describe('NuevaNombradaFormComponent', () => {
  let component: NuevaNombradaFormComponent;
  let fixture: ComponentFixture<NuevaNombradaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaNombradaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaNombradaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
