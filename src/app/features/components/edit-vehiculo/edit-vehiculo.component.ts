import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-vehiculo',
  templateUrl: './edit-vehiculo.component.html',
  styleUrls: ['./edit-vehiculo.component.scss']
})
export class EditVehiculoComponent implements OnInit {

  @Input() contratoId: number;
  @Output() onNewAdded = new EventEmitter();
  nuevoVehiculoForm: FormGroup;
  isLoading = false;
  listTipoVehiculos: any[] = [];
  vehiculo: any;
  tipoRolId: number;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService, public router: Router, public formBuilder: FormBuilder, public auth: AuthService) {
    this.vehiculo = data.vehiculo.vehiculo;
    this.tipoRolId = this.auth.getCuentaActivaValue().usuario.tipoRolId;
  }

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
      patente: [this.vehiculo.patente, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      marca: [this.vehiculo.marca, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      modelo: [this.vehiculo.modelo, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      year: [this.vehiculo.year, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      tipoVehiculoId: [this.vehiculo.tipoVehiculoId, [Validators.required]],
      rut: [this.vehiculo.chofer.rut, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nombre: [this.vehiculo.chofer.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellidoPaterno: [this.vehiculo.chofer.apellidoPaterno, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      apellidoMaterno: [this.vehiculo.chofer.apellidoMaterno, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    });
  }

  guardarVehiculo() {
    // this.isLoading = true;
    // let reqChofer = {
    //   rut: this.nuevoVehiculoForm.get('rut')?.value,
    //   nombre: this.nuevoVehiculoForm.get('nombre')?.value,
    //   apellidoPaterno: this.nuevoVehiculoForm.get('apellidoPaterno')?.value,
    //   apellidoMaterno: this.nuevoVehiculoForm.get('apellidoMaterno')?.value
    // };

    // console.log(reqChofer);

    // this.api.POST(`/choferes`, reqChofer)
    //   .then(res => {
    //     console.log(res);
    //     let reqVehiculo = {
    //       patente: this.nuevoVehiculoForm.get('patente')?.value,
    //       marca: this.nuevoVehiculoForm.get('marca')?.value,
    //       modelo: this.nuevoVehiculoForm.get('modelo')?.value,
    //       year: this.nuevoVehiculoForm.get('year')?.value,
    //       choferId: res.id,
    //       tipoVehiculoId: this.nuevoVehiculoForm.get('tipoVehiculoId')?.value
    //     };
    //     this.api.POST(`/contratos/${this.contratoId}/vehiculos`, reqVehiculo)
    //       .then(res => {
    //         this.isLoading = false;
    //         this.onNewAdded.emit();
    //         Swal.fire({
    //           title: 'Éxito',
    //           text: 'Se ha asignado el vehículo al contrato',
    //           icon: 'success',
    //           confirmButtonText: 'Aceptar'
    //         });
    //       })
    //       .catch(err => {
    //         this.isLoading = false;
    //         Swal.fire({
    //           title: 'Error',
    //           text: 'No se pudo asignar el vehículo al contrato',
    //           icon: 'error',
    //           confirmButtonText: 'Aceptar'
    //         });
    //         console.log(err);
    //       });
    //   })
  }

}
