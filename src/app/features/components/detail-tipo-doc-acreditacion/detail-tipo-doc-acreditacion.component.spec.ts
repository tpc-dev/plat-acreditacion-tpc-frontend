import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTipoDocAcreditacionComponent } from './detail-tipo-doc-acreditacion.component';

describe('DetailTipoDocAcreditacionComponent', () => {
  let component: DetailTipoDocAcreditacionComponent;
  let fixture: ComponentFixture<DetailTipoDocAcreditacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTipoDocAcreditacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTipoDocAcreditacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
