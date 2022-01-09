import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-trabajador-tpc-form',
  templateUrl: './nuevo-trabajador-tpc-form.component.html',
  styleUrls: ['./nuevo-trabajador-tpc-form.component.scss']
})
export class NuevoTrabajadorTpcFormComponent implements OnInit {
  nuevoTrabajadorForm: FormGroup;
  listGeneros: any[] = [];
  listGerencias: any[] = [];
  listEstadosCiviles: any[] = [];
  listPaises: any[] = [];
  listNivelesEducacional: any[] = [];
  isLoading = false;
  @Output() onNuevoTrabajadorAsignado = new EventEmitter();
  constructor(public router: Router, public activeRoute: ActivatedRoute, public formBuilder: FormBuilder, public api: ApiService) {
  }

  ngOnInit(): void {
    this.obtenerGeneros();
    this.obtenerGerencias();
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
      gerenciaId: ['', Validators.required],
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
      gerenciaId: this.nuevoTrabajadorForm.value.gerenciaId,
    }

    console.log(req);

    this.api.POST(`/trabajadores-tpc`, req)
      .then(res => {
        this.isLoading = false;
        Swal.fire({
          title: 'Exito',
          text: 'Trabajador creado con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.onNuevoTrabajadorAsignado.emit(res);
        console.log(res);
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

  obtenerGerencias() {
    this.api.GET('/gerencias/activos').then((data) => {
      // console.log(data);
      this.listGerencias = data;
    }).catch((error) => {
      console.log(error);
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
