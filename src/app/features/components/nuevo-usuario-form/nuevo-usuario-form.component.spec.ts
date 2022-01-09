import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoUsuarioFormComponent } from './nuevo-usuario-form.component';

describe('NuevoUsuarioFormComponent', () => {
  let component: NuevoUsuarioFormComponent;
  let fixture: ComponentFixture<NuevoUsuarioFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoUsuarioFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoUsuarioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
