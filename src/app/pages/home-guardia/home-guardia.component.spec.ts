import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGuardiaComponent } from './home-guardia.component';

describe('HomeGuardiaComponent', () => {
  let component: HomeGuardiaComponent;
  let fixture: ComponentFixture<HomeGuardiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGuardiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGuardiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
