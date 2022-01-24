import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';
import { FormularioProtocoloCovidComponent } from '../formulario-protocolo-covid/formulario-protocolo-covid.component';

@Component({
  selector: 'app-registro-acceso-trabajadores-frecuente',
  templateUrl: './registro-acceso-trabajadores-frecuente.component.html',
  styleUrls: ['./registro-acceso-trabajadores-frecuente.component.scss']
})
export class RegistroAccesoTrabajadoresFrecuenteComponent implements OnInit {

  isLoading: boolean = false;
  nombradaTrabajador: any;
  listaRegistrosAccesos: any[] = [];
  ultimoRegistro: string;
  registroInduccion: any;
  induccionVencida = true;
  isProtocoloCovidActivo: false;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService, public dialog: MatDialog) {
    this.nombradaTrabajador = data.nombradaTrabajador;
    this.isProtocoloCovidActivo = data.isProtocoloCovidActivo
    console.log(data);
  }

  ngOnInit(): void {
    this.obtenerAccesos();
    this.obtenerRegistroInduccion();
  }

  obtenerRegistroInduccion() {
    this.api.GET(`/registro-induccion/${this.nombradaTrabajador.trabajadorFrecuente.rut}/last`)
      .then(res => {
        console.log(res);
        this.registroInduccion = res;
        if (!this.registroInduccion) return;
        let today = new Date();
        let fechaVencimiento = new Date(this.registroInduccion.fechaVencimiento);
        console.log(today);
        console.log(fechaVencimiento);
        console.log(today > fechaVencimiento);

        // fecha termino induccion es menor a la actual
        if (today < fechaVencimiento) {
          this.induccionVencida = false;
          console.log("asdasd");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  obtenerAccesos() {
    this.isLoading = true;
    this.api.POST(`/nombrada-diaria/registro-acceso`, this.nombradaTrabajador)
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

    const rut = this.nombradaTrabajador.trabajadorFrecuente.rut;
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
      text: '¿Está seguro que desea marcar el ingreso del trabajador?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, marcar ingreso',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        console.log(this.nombradaTrabajador);
        this.isLoading = true;
        this.api.POST(`/nombrada-diaria/registro-acceso/${'ENTRADA'}`, this.nombradaTrabajador)
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
        this.api.POST(`/nombrada-diaria/registro-acceso/${'SALIDA'}`, this.nombradaTrabajador)
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
