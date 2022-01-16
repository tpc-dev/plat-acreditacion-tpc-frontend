import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-trabajador-frecuente',
  templateUrl: './edit-trabajador-frecuente.component.html',
  styleUrls: ['./edit-trabajador-frecuente.component.scss']
})
export class EditTrabajadorFrecuenteComponent implements OnInit {

  nuevoTrabajadorForm: FormGroup;
  isLoading = false;
  usuario: any;
  trabajadorData: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public auth: AuthService, public router: Router, public activeRoute: ActivatedRoute, public formBuilder: FormBuilder, public api: ApiService) {
    this.trabajadorData = data.trabajador;
    this.usuario = this.auth.getCuentaActivaValue().usuario;
  }

  ngOnInit(): void {
    this.nuevoTrabajadorForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      rut: new FormControl(
        this.trabajadorData.rut,
        Validators.compose([
          Validators.required,
          TPCValidations.isRutInvalido,
        ])
      ),
      nombre: [this.trabajadorData.nombres, Validators.required],
      apellidoPaterno: [this.trabajadorData.apellidoPaterno, Validators.required],
      apellidoMaterno: [this.trabajadorData.apellidoMaterno, Validators.required],
    });
  }

  editar() {
    this.isLoading = true;
    let req = {
      rut: this.nuevoTrabajadorForm.value.rut,
      nombres: this.nuevoTrabajadorForm.value.nombre,
      apellidoPaterno: this.nuevoTrabajadorForm.value.apellidoPaterno,
      apellidoMaterno: this.nuevoTrabajadorForm.value.apellidoMaterno,
      UsuarioId: this.usuario.id,
      id: this.trabajadorData.id
    }

    console.log(req);

    this.api.PUT(`/trabajadores-frecuentes/${this.trabajadorData.id}`, req)
      .then(res => {
        this.isLoading = false;
        Swal.fire({
          title: 'Exito',
          text: 'Trabajador actualizado con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.dialogRef.close(true);
        console.log(res);
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: `No se pudo editar el trabajador ${err.error}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
