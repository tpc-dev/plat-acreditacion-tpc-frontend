import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-trabajador-frecuente-form',
  templateUrl: './nuevo-trabajador-frecuente-form.component.html',
  styleUrls: ['./nuevo-trabajador-frecuente-form.component.scss']
})
export class NuevoTrabajadorFrecuenteFormComponent implements OnInit {

  nuevoTrabajadorForm: FormGroup;
  isLoading = false;
  usuario: any;
  @Output() onNuevoTrabajadorCreado = new EventEmitter();
  constructor(public auth: AuthService, public router: Router, public activeRoute: ActivatedRoute, public formBuilder: FormBuilder, public api: ApiService) {
    this.usuario = this.auth.getCuentaActivaValue().usuario;
  }

  ngOnInit(): void {
    this.nuevoTrabajadorForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      rut: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          TPCValidations.isRutInvalido,
        ])
      ),
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
    });
  }

  guardarNuevoTrabajador() {
    this.isLoading = true;
    let req = {
      rut: this.nuevoTrabajadorForm.value.rut,
      nombres: this.nuevoTrabajadorForm.value.nombre,
      apellidoPaterno: this.nuevoTrabajadorForm.value.apellidoPaterno,
      apellidoMaterno: this.nuevoTrabajadorForm.value.apellidoMaterno,
      UsuarioId: this.usuario.id
    }

    console.log(req);

    this.api.POST(`/trabajadores-frecuentes`, req)
      .then(res => {
        this.isLoading = false;
        Swal.fire({
          title: 'Exito',
          text: 'Trabajador creado con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        console.log(res);
        this.onNuevoTrabajadorCreado.emit(res);
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: `No se pudo crear el trabajador ${err.error}`,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

}
