import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-tipo-doc-acreditacion',
  templateUrl: './detail-tipo-doc-acreditacion.component.html',
  styleUrls: ['./detail-tipo-doc-acreditacion.component.scss']
})
export class DetailTipoDocAcreditacionComponent implements OnInit {

  isEdit = false;
  isLoading = false;
  tipoDocAcreditacion = { nombre: '', clasificacionDocumento: '', obligatorio: false };
  listaClasificacionDocumento: any[] = [];
  nuevoTipoDocAcreditacionForm: FormGroup;
  documentoEdit: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public apiService: ApiService, public formBuilder: FormBuilder) {
    if (this.isEdit) {
      this.documentoEdit = this.data;
    }
  }

  ngOnInit(): void {
    this.isEdit = this.data.isEdit;
    this.nuevoTipoDocAcreditacionForm = this.createNuevoTipoDocAcreditacionForm();
    if (this.isEdit) {
      this.tipoDocAcreditacion = this.data;
    } else {
      this.listaClasificacionDocumento = this.data.listaClasificacionDocumento;
    }
  }

  createNuevoTipoDocAcreditacionForm() {
    return this.formBuilder.group({
      nombre: [this.tipoDocAcreditacion.nombre, Validators.required],
      clasificacionDocumento: [this.tipoDocAcreditacion.clasificacionDocumento, Validators.required],
      obligatorio: [true]
    });
  }

  createNewTipoDocAcreditacion() {

    this.isLoading = true;
    let req = {
      nombre: this.nuevoTipoDocAcreditacionForm.get('nombre')?.value,
      DocumentoClasificacionId: this.nuevoTipoDocAcreditacionForm.get('clasificacionDocumento')?.value,
      obligatorio: this.nuevoTipoDocAcreditacionForm.get('obligatorio')?.value,
      ItemCarpetaArranqueId: this.data.idItemCarpetaArranque
    }

    console.log(req);

    this.apiService.POST('/tipo-documento-acreditacion', req)
      .then(data => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Tipo de documento de acreditación creado',
          showConfirmButton: false,
          timer: 1500
        });
        this.dialogRef.close(true);
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.message
        });
      });
  }
}
