import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';
import { NuevoJornadaFormComponent } from '../nuevo-jornada-form/nuevo-jornada-form.component';

@Component({
  selector: 'app-nuevo-turno-form',
  templateUrl: './nuevo-turno-form.component.html',
  styleUrls: ['./nuevo-turno-form.component.scss']
})
export class NuevoTurnoFormComponent implements OnInit {
  @Input() contratoId: number;
  @Output() onNuevoTurnoAdded = new EventEmitter();
  nuevoTurnoForm: FormGroup
  isLoading: boolean = false;
  listJornadas: any[] = [];
  constructor(public formbuilder: FormBuilder, public api: ApiService, public dialog: MatDialog,
    public router: Router) { }


  ngOnInit(): void {
    this.obtenerJornadasParaEsteTurno();
    this.nuevoTurnoForm = this.createForm();
  }

  obtenerJornadasParaEsteTurno() {
    this.api.GET(`/contratos/${this.contratoId}/jornadas`)
      .then(res => {
        this.listJornadas = res;
      })
      .catch(err => {
        console.log(err);
      });
  }

  createForm(): FormGroup {
    return this.formbuilder.group({
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      diasLaborales: ['', Validators.required],
      diasFestivos: ['', Validators.required],
      descripcion: ['', Validators.required],
      horasSemana: ['', Validators.required],
    });
  }

  crearTurno() {
    console.log(this.nuevoTurnoForm.value)
    this.isLoading = true;
    let req = {
      ...this.nuevoTurnoForm.value,
    }
    req.fechaInicio = new Date(req.fechaInicio).toISOString();
    req.fechaTermino = new Date(req.fechaTermino).toISOString();
    req.contratoId = this.contratoId;
    this.api.POST(`/contratos/${this.contratoId}/turnos`, req)
      .then(res => {
        this.isLoading = false;
        this.onNuevoTurnoAdded.emit(res);
        this.nuevoTurnoForm.reset();
        Swal.fire({
          title: 'Turno creado',
          text: 'El turno se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          footer: err.message,
        })
        console.log(err);
      });

    // this.isLoading = true;
    // let req = {
    //   Nombre: this.nuevoCargoForm.get('nombre')?.value,
    //   Activo: this.nuevoCargoForm.get('activo')?.value,
    //   ContratoId: this.contratoId
    // }
    // this.api.POST(`/contratos/${this.contratoId}/cargos`, req)
    //   .then(res => {
    //     this.onNuevoCargoAdded.emit(res);
    //     this.nuevoCargoForm.reset();
    //     Swal.fire({
    //       title: 'Cargo creado',
    //       text: 'El cargo se ha creado correctamente',
    //       icon: 'success',
    //       confirmButtonText: 'Aceptar'
    //     });
    //     this.isLoading = false;
    //   })
    //   .catch(err => {
    //     this.isLoading = false;
    //     Swal.fire({
    //       title: 'Error',
    //       text: 'No se pudo crear el cargo',
    //       icon: 'error',
    //       confirmButtonText: 'Aceptar'
    //     });
    //   });
  }

  recargarCargos() {
    this.onNuevoTurnoAdded.emit();
  }

  openDialogNuevaJornada() {
    this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/turnos/nueva-jornada`]);
    // this.dialog.open(NuevoJornadaFormComponent, {
    //   height: '600px',
    //   width: '900px',
    //   data: {}
    // });
  }

}
