import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';
import { FormularioProtocoloCovidComponent } from '../formulario-protocolo-covid/formulario-protocolo-covid.component';

@Component({
  selector: 'app-registro-acceso-vehiculo-contrato',
  templateUrl: './registro-acceso-vehiculo-contrato.component.html',
  styleUrls: ['./registro-acceso-vehiculo-contrato.component.scss']
})
export class RegistroAccesoVehiculoContratoComponent implements OnInit {


  isLoading: boolean = false;
  vehiculoContrato: any;
  listaRegistrosAccesos: any[] = [];
  ultimoRegistro: string;
  registroInduccion: any;
  induccionVencida = true;
  isProtocoloCovidActivo: false;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService, public dialog: MatDialog) {
    this.vehiculoContrato = data.vehiculoContrato;
    this.isProtocoloCovidActivo = data.isProtocoloCovidActivo
    console.log(data);
  }

  ngOnInit(): void {
    this.obtenerAccesos();
    // this.obtenerRegistroInduccion();
  }

  // obtenerRegistroInduccion() {
  //   this.api.GET(`/registro-induccion/${this.vehiculoContrato.vehiculo.patente}/last`)
  //     .then(res => {
  //       console.log(res);
  //       this.registroInduccion = res;
  //       if (!this.registroInduccion) return;
  //       let today = new Date();
  //       let fechaVencimiento = new Date(this.registroInduccion.fechaVencimiento);
  //       console.log(today);
  //       console.log(fechaVencimiento);
  //       console.log(today > fechaVencimiento);

  //       // fecha termino induccion es menor a la actual
  //       if (today < fechaVencimiento) {
  //         this.induccionVencida = false;
  //         console.log("asdasd");
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  obtenerAccesos() {
    this.isLoading = true;
    this.api.POST(`/contrato-vehiculo/registro-acceso`, this.vehiculoContrato)
      .then(res => {
        this.isLoading = false;
        this.listaRegistrosAccesos = res;
        if (this.listaRegistrosAccesos.length > 0) {
          this.ultimoRegistro = this.listaRegistrosAccesos[0].tipoEvento;
        }
        console.log(res);
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });

  }

  marcarRegistro(ultimoRegistro: string) {
    if (ultimoRegistro == 'ENTRADA') {
      this.marcarSalida();
    }
    if (ultimoRegistro == 'SALIDA' || !ultimoRegistro) {
      if (this.isProtocoloCovidActivo) {
        this.ingresarTemperaturaTrabajador();
      } else {
        this.marcarIngreso();
      }
    }
  }

  ingresarTemperaturaTrabajador(): void {

    const rut = this.vehiculoContrato.vehiculo.patente;
    const dialogRef = this.dialog.open(FormularioProtocoloCovidComponent, {
      width: '850px',
      height: '680px',
      data: { rut }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.marcarIngreso();
      }
    });

  }

  marcarIngreso() {
    Swal.fire({
      title: 'Ingreso',
      text: '¿Está seguro que desea marcar el ingreso del vehiculo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, marcar ingreso',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        console.log(this.vehiculoContrato);
        this.isLoading = true;
        this.api.POST(`/contrato-vehiculo/registro-acceso/${'ENTRADA'}`, this.vehiculoContrato)
          .then(res => {
            this.isLoading = false;
            Swal.fire({
              title: 'Ingreso',
              text: 'Se ha marcado el ingreso del vehiculo',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            // this.obtenerTrabajadores();
            this.dialogRef.close();
          })
          .catch(err => {
            this.isLoading = false;
            Swal.fire({
              title: 'Error',
              text: 'No se pudo marcar el ingreso del vehiculo',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log(err);
          });
      }
    });
  }

  marcarSalida() {
    Swal.fire({
      title: 'Salida',
      text: '¿Está seguro que desea marcar la salida del vehiculo?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, marcar salida',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.api.POST(`/contrato-vehiculo/registro-acceso/${'SALIDA'}`, this.vehiculoContrato)
          .then(res => {
            this.isLoading = false;
            Swal.fire({
              title: 'Salida',
              text: 'Se ha marcado la salida del vehiculo',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            // this.obtenerTrabajadores();
            this.dialogRef.close(true);
          })
          .catch(err => {
            this.isLoading = false;
            Swal.fire({
              title: 'Error',
              text: 'No se pudo marcar la salida del vehiculo',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log(err);
          });
      }
    });
  }

}
