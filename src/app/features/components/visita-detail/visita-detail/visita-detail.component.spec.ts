import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaDetailComponent } from './visita-detail.component';

describe('VisitaDetailComponent', () => {
  let component: VisitaDetailComponent;
  let fixture: ComponentFixture<VisitaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitaDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
