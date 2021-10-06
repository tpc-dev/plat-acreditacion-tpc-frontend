import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogintpcPageComponent } from './logintpc-page.component';

describe('LogintpcPageComponent', () => {
  let component: LogintpcPageComponent;
  let fixture: ComponentFixture<LogintpcPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogintpcPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogintpcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
