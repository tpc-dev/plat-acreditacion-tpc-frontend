import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignar-vehiculo-form',
  templateUrl: './asignar-vehiculo-form.component.html',
  styleUrls: ['./asignar-vehiculo-form.component.scss']
})
export class AsignarVehiculoFormComponent implements OnInit {
  @Input() contratoId: number;
  @Output() onNewAdded = new EventEmitter();
  nuevoVehiculoForm: FormGroup;
  isLoading = false;
  listTipoVehiculos: any[] = [];
  constructor(public api: ApiService, public router: Router, public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.nuevoVehiculoForm = this.createFormGroup();
    this.obtenerTipoVehiculos();
  }

  obtenerTipoVehiculos() {
    this.api.GET(`/tipo-vehiculos`)
      .then(res => {
        this.listTipoVehiculos = res;
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los tipos de vehiculos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

  createFormGroup() {
    return this.formBuilder.group({
      // patente: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      patente: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      marca: [null, [Validators.required]],
      tipoVehiculoId: [null, [Validators.required]],
      modelo: [null, [Validators.required]],
      year: [null, [Validators.required]],
      //CHOFER DATA
      rut: new FormControl(null, [Validators.required, TPCValidations.isRutInvalido]),
      nombre: new FormControl(null, [Validators.required]),
      apellidoPaterno: new FormControl(null, [Validators.required]),
      apellidoMaterno: new FormControl(null, [Validators.required]),
    });
  }

  guardarVehiculo() {
    this.isLoading = true;
    let reqChofer = {
      rut: this.nuevoVehiculoForm.get('rut')?.value,
      nombre: this.nuevoVehiculoForm.get('nombre')?.value,
      apellidoPaterno: this.nuevoVehiculoForm.get('apellidoPaterno')?.value,
      apellidoMaterno: this.nuevoVehiculoForm.get('apellidoMaterno')?.value
    };

    console.log(reqChofer);

    this.api.POST(`/choferes`, reqChofer)
      .then(res => {
        console.log(res);
        let reqVehiculo = {
          patente: this.nuevoVehiculoForm.get('patente')?.value,
          marca: this.nuevoVehiculoForm.get('marca')?.value,
          modelo: this.nuevoVehiculoForm.get('modelo')?.value,
          year: this.nuevoVehiculoForm.get('year')?.value,
          choferId: res.id,
          tipoVehiculoId: this.nuevoVehiculoForm.get('tipoVehiculoId')?.value
        };
        this.api.POST(`/contratos/${this.contratoId}/vehiculos`, reqVehiculo)
          .then(res => {
            this.isLoading = false;
            this.onNewAdded.emit();
            Swal.fire({
              title: 'Éxito',
              text: 'Se ha asignado el vehículo al contrato',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          })
          .catch(err => {
            this.isLoading = false;
            Swal.fire({
              title: 'Error',
              text: 'No se pudo asignar el vehículo al contrato',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log(err);
          });
      })
  }
}
