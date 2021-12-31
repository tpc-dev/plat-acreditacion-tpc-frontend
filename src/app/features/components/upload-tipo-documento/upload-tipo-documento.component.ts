import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-upload-tipo-documento',
  templateUrl: './upload-tipo-documento.component.html',
  styleUrls: ['./upload-tipo-documento.component.scss']
})
export class UploadTipoDocumentoComponent implements OnInit {

  fileForm: FormGroup;
  newFile: any;
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder, public api: ApiService) {
    console.log(data);
  }

  ngOnInit(): void {
    this.fileForm = this.createFileForm();
    console.log(this.getUrlAPI(this.data.documentoClasificacionId));
  }

  createFileForm() {
    return this.formBuilder.group({
      fechaInicio: [null, Validators.required],
      fechaTermino: [null, Validators.required]
    });
  }

  fileInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.newFile = fileInputEvent.target.files[0];
  }

  deleteFile() {
    this.newFile = null;
  }

  uploadFile() {
    this.dialogRef.close(this.newFile);
    this.isLoading = true;
    // CREAR ITEM TIPO DOCUMENTO EMPRESA ACREDITACION
    console.log(this.data);
    // let req = {
    //   fechaInicio: this.fileForm.get('fechaInicio')?.value,
    //   fechaTermino: this.fileForm.get('fechaTermino')?.value,
    //   EstadoAcreditacionId: 2,
    //   TipoDocumentoAcreditacionId: this.data.id,
    //   urlfile: this.newFile.name,
    // }
    let req = this.getRequestStructure(this.data.documentoClasificacionId);
    // this.api.POST(`/contratos/${this.data.contratoId}/empresas/documento`, req)
    this.api.POST(this.getUrlAPI(this.data.documentoClasificacionId), req)
      .then(data => {
        console.log(data);
        this.isLoading = false;
        this.dialogRef.close(true);
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
  }

  getRequestStructure(documentoClasificacionId: number): any {
    switch (documentoClasificacionId) {
      case 1:
        return {
          fechaInicio: this.fileForm.get('fechaInicio')?.value,
          fechaTermino: this.fileForm.get('fechaTermino')?.value,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.id,
          urlfile: this.newFile.name,
          contratoId: this.data.contratoId
        };
      case 2:
        return {
          fechaInicio: this.fileForm.get('fechaInicio')?.value,
          fechaTermino: this.fileForm.get('fechaTermino')?.value,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.id,
          urlfile: this.newFile.name,
        };
      case 3:
        return `/contratos/${this.data.contratoId}/trabajador/documento`;
      case 4:
        break;
      case 5:
        return `/contratos/${this.data.contratoId}/vehiculo/documento`;
    }
  }

  getUrlAPI(documentoClasificacionId: number): string {
    switch (documentoClasificacionId) {
      case 1:
        return `/contratos/${this.data.contratoId}/documento`;
      case 2:
        return `/contratos/${this.data.contratoId}/empresas/documento`;
      case 3:
        return `/contratos/${this.data.contratoId}/trabajador/documento`;
      case 4:
        break;
      case 5:
        return `/contratos/${this.data.contratoId}/vehiculo/documento`;
    }
    return '';
  }
}
