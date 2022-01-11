import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo-detail-guardia',
  templateUrl: './vehiculo-detail-guardia.component.html',
  styleUrls: ['./vehiculo-detail-guardia.component.scss']
})
export class VehiculoDetailGuardiaComponent implements OnInit {


  @Input() contratoId: number;
  @Output() onNewAdded = new EventEmitter();
  nuevoVehiculoForm: FormGroup;
  isLoading = false;
  listTipoVehiculos: any[] = [];
  vehiculo: any;
  contrato: any;
  listDocumentosVehiculo: any[] = [];
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService, public router: Router, public formBuilder: FormBuilder) {
    this.vehiculo = data.vehiculo.vehiculo;
    this.contrato = data.vehiculo.contrato;
  }

  ngOnInit(): void {
    this.nuevoVehiculoForm = this.createFormGroup();
    this.obtenerTipoVehiculos();
    this.obtenerDocumentosVehiculo();
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
      patente: [this.vehiculo.patente,],
      marca: [this.vehiculo.marca,],
      modelo: [this.vehiculo.modelo,],
      year: [this.vehiculo.year,],
      tipoVehiculoId: [this.vehiculo.tipoVehiculoId,],
      //
      choferName: [this.vehiculo.chofer.nombre],
      choferApellidoPaterno: [this.vehiculo.chofer.apellidoPaterno],
      choferApellidoMaterno: [this.vehiculo.chofer.apellidoMaterno],
      choferRut: [this.vehiculo.chofer.rut],

    });
  }

  obtenerDocumentosVehiculo() {
    this.api.GET(`/contrato-vehiculo/${this.contrato.id}/${this.vehiculo.id}/documentos-creados`)
      .then(res => {
        console.log(res);
        this.listDocumentosVehiculo = res;
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los documentos del vehiculo',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }


}
