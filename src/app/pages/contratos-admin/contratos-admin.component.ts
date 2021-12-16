import { Component, OnInit } from '@angular/core';
import { EtapaCreacionContrato } from 'src/app/core/interfaces/etapacreacioncontrato.interface';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-contratos-admin',
  templateUrl: './contratos-admin.component.html',
  styleUrls: ['./contratos-admin.component.scss']
})
export class ContratosAdminComponent implements OnInit {

  listEtapasCreacionContrato: EtapaCreacionContrato[] = [];

  listContratosPasoUno = [];
  listContratosPasoDos = [];
  listContratosPasoTres = [];
  listContratosPasoEnAcreditacion = [];

  isLoading = false;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.obtenerEtapaCreacionContrato();
  }

  loadContratos() {
    this.obtenerContratosPasoUnoCompletado();
    this.obtenerContratosPasoDosCompletado();
    this.obtenerContratosPasoTresCompletado();
    this.obtenerContratosPendientesProcesoAcreditacion();

    let promiseAll = Promise.all([
      this.obtenerContratosPasoUnoCompletado(),
      this.obtenerContratosPasoDosCompletado(),
      this.obtenerContratosPasoTresCompletado(),
      this.obtenerContratosPendientesProcesoAcreditacion()
    ]);

    promiseAll
      .then(() => {
        this.isLoading = false;
      })
      .catch((error) => {
        console.log(error);
        console.log('No se pudo cargar los contratos');
      });
  }

  obtenerEtapaCreacionContrato() {
    this.isLoading = true;
    this.api.GET('/etapa-creacion-contrato')
      .then((data: EtapaCreacionContrato[]) => {
        this.listEtapasCreacionContrato = data;
        this.loadContratos();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  // SOLO EXISTE REGISTRO EN TABLA CONTRATOS - NO EXISTE REGISTRO EN LA TABLA EMPRESACONTRATO
  obtenerContratosPasoUnoCompletado(): Promise<any> {

    return new Promise((resolve, reject) => {
      const idEtapaCreacionContrato = this.listEtapasCreacionContrato.find(etapa => etapa.orden == 1)?.id;
      this.api.GET(`/contratos/etapa-creacion/${idEtapaCreacionContrato}`)
        .then(res => {
          console.log(res);
          this.listContratosPasoUno = res;
          resolve(res);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        })
        .finally(() => {
          console.log('finally');
        });
    });
  }

  // EXISTE REGISTRO EN LA TABLA EMPRESACONTRATO -  NO EXISTE REGISTRO EN LA TABLA USUARIOCONTRATO
  obtenerContratosPasoDosCompletado(): Promise<any> {

    return new Promise((resolve, reject) => {
      const idEtapaCreacionContrato = this.listEtapasCreacionContrato.find(etapa => etapa.orden == 2)?.id;
      this.api.GET(`/contratos/etapa-creacion/${idEtapaCreacionContrato}`)
        .then(res => {
          console.log(res);
          this.listContratosPasoDos = res;
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => {
          console.log('finally');
        });
    });
  }

  // EXISTE REGISTRO EN LA TABLA USUARIOCONTRATO -  NO EXISTE REGISTRO EN LA TABLA CARPETA DE ARRANQUE
  obtenerContratosPasoTresCompletado(): Promise<any> {
    return new Promise((resolve, reject) => {
      const idEtapaCreacionContrato = this.listEtapasCreacionContrato.find(etapa => etapa.orden == 3)?.id;
      this.api.GET(`/contratos/etapa-creacion/${idEtapaCreacionContrato}`)
        .then(res => {
          console.log(res);
          this.listContratosPasoTres = res;
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => {
          console.log('finally');
        });
    });

  }

  // EXISTE REGISTRO EN LA TABLA CARPETA DE ARRANQUE - EMPIEZA SU ESTADO DE ACREDITACION DE DOCUMENTOS
  obtenerContratosPendientesProcesoAcreditacion(): Promise<any> {
    return new Promise((resolve, reject) => {
      const idEtapaCreacionContrato = this.listEtapasCreacionContrato.find(etapa => etapa.orden == 4)?.id;
      this.api.GET(`/contratos/etapa-creacion/${idEtapaCreacionContrato}`)
        .then(res => {
          console.log(res);
          this.listContratosPasoEnAcreditacion = res;
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
        .finally(() => {
          console.log('finally');
        });
    });
  }
}
