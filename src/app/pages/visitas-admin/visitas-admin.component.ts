import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import * as moment from 'moment';
import { Cuenta, Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-visitas-admin',
  templateUrl: './visitas-admin.component.html',
  styleUrls: ['./visitas-admin.component.scss']
})
export class VisitasAdminComponent implements OnInit {
  @ViewChild(MatTabGroup) tabs!: MatTabGroup;
  listVisitasHoy: Array<Visita> = [];
  listTodasLasVisitas: Array<Visita> = [];
  listVisitasIngresadas: Array<Visita> = [];
  listaEncargados: Array<Usuario> = [];
  isLoading = false;
  isAdministrador: boolean = true;
  cuenta!: Cuenta;
  constructor(public utilService: UtilService, public _snackBar: MatSnackBar, public api: ApiService, public authService: AuthService) {
    // this.obtenerVisitasActivas();
    this.obtenerEncargados();
    this.authService.getCuentaActiva().subscribe((cuenta: Cuenta) => {
      this.cuenta = cuenta;
      this.obtenerMisVisitas();
    })
  }

  obtenerMisVisitas() {
    this.isLoading = true;
    this.api.obtenerVisitasPorEncargado(this.cuenta.usuario.id).toPromise().then((res) => {
      console.log(res);
      // this.listTodasLasVisitas = res.filter((visita: Visita) => {
      //   return visita.haIngresado == false;
      // });
      this.listTodasLasVisitas = res;
      this.obtenerVisitasHoy(this.listTodasLasVisitas);
      this.isLoading = false;
    }).catch((err: any) => {
      console.log(err);
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.obtenerEncargados();
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

}
