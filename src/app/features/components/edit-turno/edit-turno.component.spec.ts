import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTurnoComponent } from './edit-turno.component';

describe('EditTurnoComponent', () => {
  let component: EditTurnoComponent;
  let fixture: ComponentFixture<EditTurnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTurnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
