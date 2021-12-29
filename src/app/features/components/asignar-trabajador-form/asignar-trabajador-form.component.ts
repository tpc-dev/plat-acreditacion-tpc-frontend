import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-asignar-trabajador-form',
  templateUrl: './asignar-trabajador-form.component.html',
  styleUrls: ['./asignar-trabajador-form.component.scss']
})
export class AsignarTrabajadorFormComponent implements OnInit {

  @Input() contratoId: number;
  nuevoTurnoForm: FormGroup
  @Output() onNuevoTrabajadorAsignado = new EventEmitter();
  nuevoTrabajadorContrato: FormGroup;
  listCargos: any[] = [];
  listTurnos: any[] = [];

  listTrabajadores: any[] = [];
  filteredOptions: Observable<any[]> | undefined;
  isLoading = false;
  constructor(public formBuilder: FormBuilder, public api: ApiService, public router: Router) { }

  ngOnInit(): void {
    this.nuevoTrabajadorContrato = this.createFormGroup();
    this.obtenerData();
  }

  obtenerData() {
    this.obtenerCargos();
    this.obtenerTurnos();
    this.obtenerTrabajadores();
  };

  obtenerTrabajadores() {
    this.api.GET(`/trabajadores`)
      .then(res => {
        this.listTrabajadores = res;
        this.filteredOptions = this.nuevoTrabajadorContrato.get('trabajadorId')?.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
        console.log(res);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los trabajadores',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

  private _filter(value: any): string[] {

    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.listTrabajadores.filter(trabajador => {
        return trabajador.nombres.toLowerCase().includes(filterValue) || trabajador.apellidoPaterno.toLowerCase().includes(filterValue)
          || trabajador.apellidoMaterno.toLowerCase().includes(filterValue) || trabajador.rut.toLowerCase().includes(filterValue)
      });
    }
    return this.listTrabajadores;
  }

  obtenerCargos() {
    // this.api.GET('/cargos')
    this.api.GET(`/contratos/${this.contratoId}/cargos`)
      .then(res => {
        this.listCargos = res;
        console.log(res);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los cargos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

  obtenerTurnos() {
    this.api.GET(`/contratos/${this.contratoId}/turnos`)
      .then(res => {
        this.listTurnos = res;
        console.log(res);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los turnos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      }
      );
  }

  asignarTrabajadorContrato() {
    this.isLoading = true;
    let req = {
      cargoId: this.nuevoTrabajadorContrato.get('cargoId')?.value,
      turnoId: this.nuevoTrabajadorContrato.get('turnoId')?.value,
      trabajadorId: this.nuevoTrabajadorContrato.get('trabajadorId')?.value,
      contratoId: this.contratoId,
      estadoAcreditacionId  : 2 // Estado de acreditacion pendiente
    }
    console.log(req);

    this.api.POST(`/contratos/${this.contratoId}/trabajadores/asignar`, req)
      .then(res => {
        Swal.fire({
          title: 'Exito',
          text: 'Trabajador asignado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.isLoading = false;
        this.nuevoTrabajadorContrato.reset();
        this.onNuevoTrabajadorAsignado.emit();
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo asignar el trabajador',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        this.isLoading = false;
        console.log(err);
      });
  }


  createFormGroup() {
    return this.formBuilder.group({
      cargoId: ['', Validators.required],
      turnoId: ['', Validators.required],
      trabajadorId: ['', Validators.required],
    });
  }

  openCrearNuevoTrabajador() {
    this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/trabajadores/nuevo-trabajador`]);
  }

  getFormatTrabajador(trabajadorId: string) {
    if (this.listTrabajadores.length == 0) return '';
    let trabajdor = this.listTrabajadores.find(trabajador => trabajador.id === trabajadorId)
    return `${trabajdor.nombres} ${trabajdor.apellidoPaterno} ${trabajdor.apellidoMaterno}`;
  }

}
