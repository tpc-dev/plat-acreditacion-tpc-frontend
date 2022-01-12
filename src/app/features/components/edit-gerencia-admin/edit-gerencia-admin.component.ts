import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-gerencia-admin',
  templateUrl: './edit-gerencia-admin.component.html',
  styleUrls: ['./edit-gerencia-admin.component.scss']
})
export class EditGerenciaAdminComponent implements OnInit {

  nuevaGerenciaForm!: FormGroup;
  isLoadingNew = false;
  @Output() onNuevaGerenciaAgregada = new EventEmitter();
  usuarioId!: number | undefined;
  gerencia: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService,
    public authService: AuthService) {
    this.gerencia = data.gerencia;
  }

  ngOnInit(): void {
    this.nuevaGerenciaForm = this.createNuevaGerenciaForm();
  }

  obtenerEstadosAcreditacion() {

  }

  createNuevaGerenciaForm() {
    return this.formBuilder.group({
      nombre: new FormControl(
        this.gerencia.nombre,
        Validators.compose([
          Validators.required,
        ])
      ),
      activo: new FormControl(
        this.gerencia.activo,
        Validators.compose([
          Validators.required,
        ])
      )
    });
  }

  editarGerencia() {
    this.isLoadingNew = true;
    let req = {
      nombre: this.nuevaGerenciaForm.value.nombre,
      activo: this.nuevaGerenciaForm.value.activo,
      id: this.gerencia.id
    }
    this.api.PUT(`/gerencias/${this.gerencia.id}`, req)
      .then(res => {
        this.onNuevaGerenciaAgregada.emit(res);
        Swal.fire({
          title: 'Gerencia editada',
          text: 'La gerencia ha sido editada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.dialogRef.close();
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: `No se pudo editar la gerencia. ${err.error}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
      .finally(() => {
        this.isLoadingNew = false;
      });
  }
}
