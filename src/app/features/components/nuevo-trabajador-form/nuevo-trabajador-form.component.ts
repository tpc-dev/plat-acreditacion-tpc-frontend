import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-trabajador-form',
  templateUrl: './nuevo-trabajador-form.component.html',
  styleUrls: ['./nuevo-trabajador-form.component.scss']
})
export class NuevoTrabajadorFormComponent implements OnInit {
  nuevoTrabajadorForm: FormGroup;
  listGeneros: any[] = [];
  listEstadosCiviles: any[] = [];
  listPaises: any[] = [];
  listNivelesEducacional: any[] = [];
  contratoId: number;
  isLoading = false;
  constructor(public router: Router, public activeRoute: ActivatedRoute, public formBuilder: FormBuilder, public api: ApiService) {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });
  }

  ngOnInit(): void {
    this.obtenerGeneros();
    this.obtenerEstadosCiviles();
    this.obtenerPaises();
    this.obtenerNivelesEducacional();
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
      fechaNacimiento: ['', Validators.required],
      generoId: ['', Validators.required],
      estadoCivilId: ['', Validators.required],
      nivelEducacionalId: ['', Validators.required],
      paisId: ['', Validators.required],
    });
  }

  guardarNuevoTrabajador() {
    this.isLoading = true;
    let req = {
      rut: this.nuevoTrabajadorForm.value.rut,
      nombres: this.nuevoTrabajadorForm.value.nombre,
      apellidoPaterno: this.nuevoTrabajadorForm.value.apellidoPaterno,
      apellidoMaterno: this.nuevoTrabajadorForm.value.apellidoMaterno,
      fechaNacimiento: this.nuevoTrabajadorForm.value.fechaNacimiento.toISOString(),
      generoId: this.nuevoTrabajadorForm.value.generoId,
      estadoCivilId: this.nuevoTrabajadorForm.value.estadoCivilId,
      nivelEducacionalId: this.nuevoTrabajadorForm.value.nivelEducacionalId,
      paisId: this.nuevoTrabajadorForm.value.paisId,
      contratoId: this.contratoId
    }

    console.log(req);

    this.api.POST(`/contratos/${this.contratoId}/trabajadores`, req)
      .then(res => {
        this.isLoading = false;
        Swal.fire({
          title: 'Exito',
          text: 'Trabajador creado con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        console.log(res);
        this.router.navigate(['../'], { relativeTo: this.activeRoute });
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

  obtenerGeneros() {
    this.api.GET(`/generos/activos`)
      .then(res => {
        this.listGeneros = res;
        console.log(res);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los generos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

  obtenerEstadosCiviles() {
    this.api.GET(`/estado-civil/activos`)
      .then(res => {
        this.listEstadosCiviles = res;
        console.log(res);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los estados civiles',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

  obtenerNivelesEducacional() {
    this.api.GET(`/nivel-educacional/activos`)
      .then(res => {
        this.listNivelesEducacional = res;
        console.log(res);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los niveles educacionales',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

  obtenerPaises() {
    this.api.GET(`/paises/activos`)
      .then(res => {
        this.listPaises = res;
        console.log(res);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los paises',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }
}
