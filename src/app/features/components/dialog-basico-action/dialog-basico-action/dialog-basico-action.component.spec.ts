import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBasicoActionComponent } from './dialog-basico-action.component';

describe('DialogBasicoActionComponent', () => {
  let component: DialogBasicoActionComponent;
  let fixture: ComponentFixture<DialogBasicoActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBasicoActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBasicoActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
