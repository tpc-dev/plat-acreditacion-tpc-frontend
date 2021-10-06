import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittestriesgosPageComponent } from './edittestriesgos-page.component';

describe('EdittestriesgosPageComponent', () => {
  let component: EdittestriesgosPageComponent;
  let fixture: ComponentFixture<EdittestriesgosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittestriesgosPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittestriesgosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
