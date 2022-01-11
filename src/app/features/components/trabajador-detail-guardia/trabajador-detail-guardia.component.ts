import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajador-detail-guardia',
  templateUrl: './trabajador-detail-guardia.component.html',
  styleUrls: ['./trabajador-detail-guardia.component.scss']
})
export class TrabajadorDetailGuardiaComponent implements OnInit {
  nuevoTrabajadorForm: FormGroup;
  nuevoTurnoForm: FormGroup;
  nuevaJornadaForm: FormGroup;
  listGeneros: any[] = [];
  listEstadosCiviles: any[] = [];
  listPaises: any[] = [];
  listNivelesEducacional: any[] = [];
  contratoId: number;
  isLoading = false;
  trabajadorData: any;
  tipoTrabajador: string;
  turno: any;
  jornada: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public activeRoute: ActivatedRoute, public formBuilder: FormBuilder, public api: ApiService) {
    this.trabajadorData = data.trabajador.trabajador;
    console.log(data);
    this.tipoTrabajador = data.tipo;
    this.turno = data.trabajador.turno;
    this.jornada = data.trabajador.turno.jornada;
    console.log(this.turno);
    console.log(this.jornada);

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
    this.nuevoTrabajadorForm = this.data.tipo == 'FRECUENTE' ? this.createFormGroupFrecuente() : this.createFormGroup();
    this.nuevoTurnoForm = this.createFormGroupTurno();
    this.nuevaJornadaForm = this.createFormJornada();
  }

  createFormJornada(): FormGroup {
    return this.formBuilder.group({
      nombre: [this.jornada.nombre],
      fechaInicio: [this.jornada.fechaInicio],
      horaInicio: [this.jornada.horaInicio],
      horaTermino: [this.jornada.horaTermino],
    });
  }
  createFormGroupTurno() {
    return this.formBuilder.group({
      fechaInicio: [this.turno.fechaInicio],
      fechaTermino: [this.turno.fechaTermino],
      diasLaborales: [this.turno.diasLaborales],
      diasFestivos: [this.turno.diasFestivos],
      descripcion: [this.turno.descripcion],
      horasSemana: [this.turno.horasSemana],
    });
  }

  createFormGroupFrecuente() {
    return this.formBuilder.group({
      rut: new FormControl(
        this.trabajadorData.rut,
        Validators.compose([
          Validators.required,
          TPCValidations.isRutInvalido,
        ])
      ),
      nombre: [this.trabajadorData.nombres],
      apellidoPaterno: [this.trabajadorData.apellidoPaterno],
      apellidoMaterno: [this.trabajadorData.apellidoMaterno],
    });
  }

  createFormGroup() {
    return this.formBuilder.group({
      rut: new FormControl(
        this.trabajadorData.rut
      ),
      nombre: [this.trabajadorData.nombres],
      apellidoPaterno: [this.trabajadorData.apellidoPaterno],
      apellidoMaterno: [this.trabajadorData.apellidoMaterno],
      fechaNacimiento: [this.trabajadorData.fechaNacimiento],
      generoId: [{ value: this.trabajadorData.generoId, disabled: true }],
      estadoCivilId: [{ value: this.trabajadorData.estadoCivilId, disabled: true }],
      nivelEducacionalId: [{ value: this.trabajadorData.nivelEducacionalId, disabled: true }],
      paisId: [{ value: this.trabajadorData.paisId, disabled: true }],
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
