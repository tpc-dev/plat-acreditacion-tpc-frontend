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
  listTodasLasVisitas: Array<Visita> = [];
  listVisitasIngresadas: Array<Visita> = [];
  listaEncargados: Array<Usuario> = [];
  isLoading = false;
  constructor(public api: ApiService, public utilService: UtilService, public dialog: MatDialog) {
    this.obtenerVisitasActivas();
    this.obtenerEncargados();
  }

  ngAfterViewInit() {

  }

  obtenerVisitasActivas() {
    this.isLoading = true;
    this.api.obtenerVisitasActivas().toPromise().then((res) => {
      console.log(res);
      this.listTodasLasVisitas = res;
      this.obtenerVisitasHoy(res);
      this.obtenerVisitasIngresadas(res);
      this.isLoading = false;
    }).catch((err: any) => {
      console.log(err);
      this.isLoading = false;
    });
  }

  obtenerEncargados(): void {
    this.api.getUsuarioPorRol(2).subscribe(res => {
      console.log(res)
      this.listaEncargados = res;
    }, error => {
      console.log(error)
    })
  }

  obtenerVisitasHoy(listaTodasLasVisitas: Array<Visita>) {
    this.listVisitasHoy = listaTodasLasVisitas.filter((visita: Visita) => {
      const fechaVisita = moment(visita.fechaVisita).format('L');
      const fechaHoy = moment().format('L');
      return fechaVisita == fechaHoy && visita.haIngresado == false;
    });
  }

  obtenerVisitasIngresadas(listVisitasIngresadas: Array<Visita>) {
    this.listVisitasIngresadas = listVisitasIngresadas.filter((visita: Visita) => {
      return visita.haIngresado == true;
    });
  }
}





