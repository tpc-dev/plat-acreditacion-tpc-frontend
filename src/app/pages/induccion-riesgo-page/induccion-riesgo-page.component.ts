import { Component, OnInit, ViewChild } from '@angular/core';
import { MatVerticalStepper } from '@angular/material/stepper';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-induccion-riesgo-page',
  templateUrl: './induccion-riesgo-page.component.html',
  styleUrls: ['./induccion-riesgo-page.component.scss']
})


export class InduccionRiesgoPageComponent implements OnInit {

  rutVerificar: string;
  showStepper: boolean = false;
  isLoading: boolean = false;
  @ViewChild('stepper') stepper: MatVerticalStepper;
  fechaRealizacion: any;
  fechaVencimiento: any;
  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }

  verificarInduccion() {
    Swal.fire({
      title: 'Ingrese su RUT',
      input: 'text',
      inputPlaceholder: 'Ej: 12345678-9',
      inputAttributes: {
        autocapitalize: 'off',
      },

      showCancelButton: true,
      confirmButtonText: 'Verificar',
      showLoaderOnConfirm: true,
      preConfirm: (rut) => {
        if (this.isRutInvalido(rut)) return this.showRutInvalido();
        this.api.GET(`/registro-induccion/${rut}/last`)
          .then(response => {
            if (!response) return this.showNoExiste();
            response.fechaVencimiento = moment(response.fechaVencimiento).format('DD/MM/YYYY');
            this.showExisteInduccion(response);
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  public isRutInvalido(rutVerificar: any) {
    if (!rutVerificar) {
      return null;
    }

    // verificar si un string tienen un - 
    if (rutVerificar.indexOf('-') == -1)
      return { rutValido: true };

    var tmp = rutVerificar.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';

    var M = 0,
      S = 1;
    for (; rut; rut = Math.floor(rut / 10)) {
      S = (S + (rut % 10) * (9 - (M++ % 6))) % 11;
    }
    const digitoVerificador = S ? S - 1 : 'k';
    const response = digitoVerificador == digv ? null : { rutValido: true };
    return response;
  }

  showExisteInduccion(registroInduccion: any) {
    Swal.fire({
      title: 'Existe Inducción',
      text: `El rut ingresado tiene una inducción de riesgo registrada valida hasta ${registroInduccion.fechaVencimiento}`,
      icon: 'success',
      confirmButtonText: 'Ok'
    })
  }

  showNoExiste() {
    Swal.fire({
      title: 'No existe',
      text: 'El rut ingresado no tiene una inducción de riesgo registrada',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

  showRutInvalido() {
    Swal.fire({
      title: 'Rut invalido',
      text: 'El rut ingresado no es valido',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
  }

  onRegistroGuardado(data: any) {
    console.log(data);
    if (data.aprobado == true) {
      this.isLoading = true;
      let req = {
        Rut: data.rut,
        FechaVencimiento: new Date(),
        FechaRealizacion: new Date(),
      }
      this.api.POST('/registro-induccion', req)
        .then(response => {
          this.fechaRealizacion = moment(response.fechaRealizacion).format('DD/MM/YYYY');
          this.fechaVencimiento = moment(response.fechaVencimiento).format('DD/MM/YYYY');
          this.isLoading = false;

          this.stepper.next();
        })
        .catch(error => {
          this.isLoading = false;
        });
      return;
    }

    if (data.aprobado == false) {
      Swal.fire({
        title: 'Prueba Reprobada',
        text: 'No conseguiste los puntos necesarios para la prueba',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
      return;
    }
  }

}
