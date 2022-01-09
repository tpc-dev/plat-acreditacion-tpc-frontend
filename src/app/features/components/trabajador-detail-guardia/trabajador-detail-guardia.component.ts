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
  listGeneros: any[] = [];
  listEstadosCiviles: any[] = [];
  listPaises: any[] = [];
  listNivelesEducacional: any[] = [];
  contratoId: number;
  isLoading = false;
  trabjadorData: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public activeRoute: ActivatedRoute, public formBuilder: FormBuilder, public api: ApiService) {
    this.trabjadorData = data.trabajador.trabajador;
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
        this.trabjadorData.rut,
        Validators.compose([
          Validators.required,
          TPCValidations.isRutInvalido,
        ])
      ),
      nombre: [this.trabjadorData.nombres, Validators.required],
      apellidoPaterno: [this.trabjadorData.apellidoPaterno, Validators.required],
      apellidoMaterno: [this.trabjadorData.apellidoMaterno, Validators.required],
      fechaNacimiento: [this.trabjadorData.fechaNacimiento, Validators.required],
      generoId: [{ value: this.trabjadorData.generoId, disabled: true }, Validators.required],
      estadoCivilId: [this.trabjadorData.estadoCivilId, Validators.required],
      nivelEducacionalId: [this.trabjadorData.nivelEducacionalId, Validators.required],
      paisId: [this.trabjadorData.paisId, Validators.required],
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
