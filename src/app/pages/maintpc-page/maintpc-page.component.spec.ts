import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintpcPageComponent } from './maintpc-page.component';

describe('MaintpcPageComponent', () => {
  let component: MaintpcPageComponent;
  let fixture: ComponentFixture<MaintpcPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintpcPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintpcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
