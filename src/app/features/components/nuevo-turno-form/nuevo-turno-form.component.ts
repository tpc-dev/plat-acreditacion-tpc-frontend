import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';

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
  constructor(public formbuilder: FormBuilder, public api: ApiService) { }


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
      activo: [true]
    });
  }

  crearTurno() {
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

}
