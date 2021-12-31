import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoAcreditacionDetailComponent } from './documento-acreditacion-detail.component';

describe('DocumentoAcreditacionDetailComponent', () => {
  let component: DocumentoAcreditacionDetailComponent;
  let fixture: ComponentFixture<DocumentoAcreditacionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoAcreditacionDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoAcreditacionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
