import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaAreaFormComponent } from './nueva-area-form.component';

describe('NuevaAreaFormComponent', () => {
  let component: NuevaAreaFormComponent;
  let fixture: ComponentFixture<NuevaAreaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaAreaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaAreaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
