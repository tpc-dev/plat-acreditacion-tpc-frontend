import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import * as moment from 'moment';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-visitas-guardia',
  templateUrl: './visitas-guardia.component.html',
  styleUrls: ['./visitas-guardia.component.scss']
})

export class VisitasGuardiaComponent implements AfterViewInit {

  @ViewChild(MatTabGroup) tabs!: MatTabGroup;
  listVisitasHoy: Array<Visita> = [];
  listVisitasAgendadas: Array<Visita> = [];
  listVisitasHistorico: Array<Visita> = [];
  listTodasLasVisitas: Array<Visita> = [];
  listVisitasIngresadas: Array<Visita> = [];
  listaEncargados: Array<Usuario> = [];
  isLoading = false;
  constructor(public api: ApiService, public utilService: UtilService, public dialog: MatDialog) {
    this.obtenerVisitas();
    this.obtenerEncargados();
  }

  ngAfterViewInit() {

  }

  obtenerVisitas() {
    this.isLoading = true;
    // this.obtenerVisitasAgendadasHoy();
    // this.obtenerVisitasAgendadas();
    // this.obtenerVisitasHistorico();
    this.api.GET('/visitas/hoy')
      .then((res: any) => {
        this.listVisitasHoy = res;
        return this.api.GET('/visitas/agendadas')
      })
      .then((res: any) => {
        this.listVisitasAgendadas = res;
        console.log(this.listVisitasAgendadas);
        return this.api.GET('/visitas/historico')
      }).then((res: any) => {
        this.listVisitasHistorico = res;
        this.isLoading = false;
      }).catch((err: any) => {
        console.log(err);
      }).catch((err: any) => {
        console.log(err);
      }).catch((err: any) => {
        console.log(err);
      });
  }

  obtenerEncargados(): void {
    this.api.GET('/usuarios').then((res: any) => {
      console.log(res)
      this.listaEncargados = res;
    }, error => {
      console.log(error)
    })
  }

  obtenerVisitasAgendadasHoy() {
    this.api.GET('/visitas/hoy').then((res: any) => {
      console.log(res);
      this.listVisitasHoy = res;
      this.isLoading = false;
    }).catch((err: any) => {
      console.log(err);
    });
  }

  obtenerVisitasAgendadas() {
    this.api.GET('/visitas/agendadas').then((res: any) => {
      console.log(res);
      this.listVisitasAgendadas = res;
    }).catch((err: any) => {
      console.log(err);
    });
  }

  obtenerVisitasHistorico() {
    this.api.GET('/visitas/historico').then((res: any) => {
      console.log(res);
      this.listVisitasHistorico = res;
    }).catch((err: any) => {
      console.log(err);
    });
  }

  obtenerVisitasHoy(listaTodasLasVisitas: Array<Visita>) {
    this.listVisitasHoy = listaTodasLasVisitas.filter((visita: Visita) => {
      const fechaVisita = moment(visita.fechaVisita).format('L');
      const fechaHoy = moment().format('L');
      return fechaVisita == fechaHoy;
    });
  }

  obtenerVisitasIngresadas(listVisitasIngresadas: Array<Visita>) {
    this.listVisitasIngresadas = listVisitasIngresadas.filter((visita: Visita) => {
      return visita.haIngresado == true;
    });
  }
}





