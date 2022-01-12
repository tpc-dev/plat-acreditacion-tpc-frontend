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
    console.log(this.area);
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

  editarArea() {
    this.isLoadingNew = true;
    let req = {
      nombre: this.nuevaAreaForm.value.nombre,
      activo: this.nuevaAreaForm.value.activo ,
      id: this.area.id
    }

    console.log(req);

    this.api.PUT(`/areas/${this.area.id}`, req)
      .then(res => {
        this.onNuevaAreaAgregada.emit(res);
        Swal.fire({
          title: 'Area editada',
          text: 'La área ha sido editada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.dialogRef.close();
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: `No se pudo editar la área. ${err.error}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
      .finally(() => {
        this.isLoadingNew = false;
      });
  }
}
