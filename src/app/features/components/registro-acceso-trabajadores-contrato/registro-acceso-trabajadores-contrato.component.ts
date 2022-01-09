import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-acceso-trabajadores-contrato',
  templateUrl: './registro-acceso-trabajadores-contrato.component.html',
  styleUrls: ['./registro-acceso-trabajadores-contrato.component.scss']
})
export class RegistroAccesoTrabajadoresContratoComponent implements OnInit {

  isLoading: boolean = false;
  contratoTrabajador: any;
  listaRegistrosAccesos: any[] = [];
  ultimoRegistro: string;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService) {
    this.contratoTrabajador = data;
  }

  ngOnInit(): void {

    this.obtenerAccesos();
  }

  obtenerAccesos() {
    this.isLoading = true;
    this.api.POST(`/contrato-trabajador/registro-acceso`, this.contratoTrabajador)
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

    if (ultimoRegistro == 'SALIDA') {
      this.marcarIngreso();
    }
  }

  marcarIngreso() {
    Swal.fire({
      title: 'Ingreso',
      text: '¿Está seguro que desea marcar el ingreso del trabajador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, marcar ingreso',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.api.POST(`/contrato-trabajador/registro-acceso/${'ENTRADA'}`, this.contratoTrabajador)
          .then(res => {
            this.isLoading = false;
            Swal.fire({
              title: 'Ingreso',
              text: 'Se ha marcado el ingreso del trabajador',
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
              text: 'No se pudo marcar el ingreso del trabajador',
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
      text: '¿Está seguro que desea marcar la salida del trabajador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, marcar salida',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.api.POST(`/contrato-trabajador/registro-acceso/${'SALIDA'}`, this.contratoTrabajador)
          .then(res => {
            this.isLoading = false;
            Swal.fire({
              title: 'Salida',
              text: 'Se ha marcado la salida del trabajador',
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
              text: 'No se pudo marcar la salida del trabajador',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log(err);
          });
      }
    });
  }

}
