import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-areas-admin',
  templateUrl: './edit-areas-admin.component.html',
  styleUrls: ['./edit-areas-admin.component.scss']
})
export class EditAreasAdminComponent implements OnInit {
  nuevaAreaForm!: FormGroup;
  isLoadingNew = false;
  @Output() onNuevaAreaAgregada = new EventEmitter();
  usuarioId!: number | undefined;
  area: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService,
    public authService: AuthService) {
    this.area = data.area;
  }

  ngOnInit(): void {
    this.nuevaAreaForm = this.createNuevaAreaForm();
  }

  obtenerEstadosAcreditacion() {

  }

  createNuevaAreaForm() {
    return this.formBuilder.group({
      nombre: new FormControl(
        this.area.nombre,
        Validators.compose([
          Validators.required,
        ])
      ),
      activo: new FormControl(
        this.area.activo,
        Validators.compose([
          Validators.required,
        ])
      )
    });
  }

  crearArea() {
    this.isLoadingNew = true;
    let req = {
      nombre: this.nuevaAreaForm.value.nombre,
      activo: this.nuevaAreaForm.value.activo == "true" ? true : false,
    }
    this.api.POST('/areas', req)
      .then(res => {
        this.onNuevaAreaAgregada.emit(res);
        Swal.fire({
          title: 'Area creada',
          text: 'La área ha sido creada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.nuevaAreaForm.reset();
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: `No se pudo crear la área. ${err.error}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
      .finally(() => {
        this.isLoadingNew = false;
      });
  }
}
