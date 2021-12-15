import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-contratos-admin',
  templateUrl: './contratos-admin.component.html',
  styleUrls: ['./contratos-admin.component.scss']
})
export class ContratosAdminComponent implements OnInit {


  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.obtenerContratosPasoUnoCompletado();
    this.obtenerContratosPasoDosCompletado();
    this.obtenerContratosPasoTresCompletado();
    this.obtenerContratosPendientesProcesoAcreditacion();
  }

  // SOLO EXISTE REGISTRO EN TABLA CONTRATOS - NO EXISTE REGISTRO EN LA TABLA EMPRESACONTRATO
  obtenerContratosPasoUnoCompletado() {
    this.api.GET('contratos/paso-uno-completado')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log('finally');
      });
  }

  // EXISTE REGISTRO EN LA TABLA EMPRESACONTRATO -  NO EXISTE REGISTRO EN LA TABLA USUARIOCONTRATO
  obtenerContratosPasoDosCompletado() {
    this.api.GET('contratos/paso-dos-completado')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log('finally');
      });
  }

  // EXISTE REGISTRO EN LA TABLA USUARIOCONTRATO -  NO EXISTE REGISTRO EN LA TABLA CARPETA DE ARRANQUE
  obtenerContratosPasoTresCompletado() {
    this.api.GET('contratos/paso-tres-completado')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log('finally');
      });
  }

  // EXISTE REGISTRO EN LA TABLA CARPETA DE ARRANQUE - EMPIEZA SU ESTADO DE ACREDITACION DE DOCUMENTOS
  obtenerContratosPendientesProcesoAcreditacion() {
    this.api.GET('contratos/pendientes-proceso-acreditacion')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log('finally');
      });
  }
}
