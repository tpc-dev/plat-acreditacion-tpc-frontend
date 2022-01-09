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
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService, public router: Router, public formBuilder: FormBuilder) {
    this.vehiculo = data.vehiculo;
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
    });
  }

  guardarVehiculo() {

  }
}
