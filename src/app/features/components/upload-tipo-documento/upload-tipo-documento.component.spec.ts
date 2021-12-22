import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTipoDocumentoComponent } from './upload-tipo-documento.component';

describe('UploadTipoDocumentoComponent', () => {
  let component: UploadTipoDocumentoComponent;
  let fixture: ComponentFixture<UploadTipoDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTipoDocumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadTipoDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
