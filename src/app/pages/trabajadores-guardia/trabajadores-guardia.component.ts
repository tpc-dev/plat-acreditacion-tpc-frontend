import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/services/api/api.service';
import { RegistroAccesoTrabajadoresContratoComponent } from 'src/app/features/components/registro-acceso-trabajadores-contrato/registro-acceso-trabajadores-contrato.component';
import { TrabajadorDetailGuardiaComponent } from 'src/app/features/components/trabajador-detail-guardia/trabajador-detail-guardia.component';
import Swal from 'sweetalert2';

export interface UserData {
  rut: string;
  name: string;
  area: string;
  encargado: string;
}
@Component({
  selector: 'app-trabajadores-guardia',
  templateUrl: './trabajadores-guardia.component.html',
  styleUrls: ['./trabajadores-guardia.component.scss']
})
export class TrabajadoresGuardiaComponent implements AfterViewInit {
  fechaHoyString = moment().format('DD/MM/YYYY');
  isLoading = false;

  // dataSource!: MatTableDataSource<any>;
  // displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'acciones'];
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  contratoId: number;
  listaTrabajadoresContrato: any[] = [];
  listTrabajadoresTPC: any[] = [];
  listaTrabajadoresFrecuentes: any[] = [];
  //

  dataSourceTPC: MatTableDataSource<any>;
  displayedColumnsTPC: string[] = ['rut', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'gerencia', 'acciones'];
  @ViewChild('TableTPCPaginator', { static: true }) tableTPCPaginator: MatPaginator;
  @ViewChild('TableTPCSort', { static: true }) tableTPCSort: MatSort;

  dataSourceContrato: MatTableDataSource<any>;
  displayedColumnsContrato: string[] = ['rut', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'acciones'];
  @ViewChild('TableContratoPaginator', { static: true }) tableContratoPaginator: MatPaginator;
  @ViewChild('TableContratoSort', { static: true }) tableContratoSort: MatSort;

  dataSourceFrecuente: MatTableDataSource<any>;
  displayedColumnsFrecuente: string[] = ['rut', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'acciones'];
  @ViewChild('TableFrecuentePaginator', { static: true }) tableFrecuentePaginator: MatPaginator;
  @ViewChild('TableFrecuenteSort', { static: true }) tableFrecuenteSort: MatSort;

  constructor(public api: ApiService, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });

  }

  ngOnInit() {
    // this.obtenerTrabajadores();
    this.cargarTrabajadores()
  }

  // obtenerTrabajadoresContrato() {

  // }

  ngAfterViewInit() {
    // this.dataSourceContrato.paginator = this.tableContratoPaginator;
    // this.dataSourceContrato.sort = this.tableContratoSort;
  }

  applyFilterContrato(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceContrato.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceContrato.paginator) {
      this.dataSourceContrato.paginator.firstPage();
    }
  }

  applyFilterTPC(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTPC.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTPC.paginator) {
      this.dataSourceTPC.paginator.firstPage();
    }
  }

  applyFilterFrecuentes(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceFrecuente.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceFrecuente.paginator) {
      this.dataSourceFrecuente.paginator.firstPage();
    }
  }

  marcarIngreso(contratoTrabajador: any, tipo: string) {
    let dialog = this.dialog.open(RegistroAccesoTrabajadoresContratoComponent, {
      width: '1000px',
      height: 'auto',
      data: {
        contratoTrabajador: contratoTrabajador
      }
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.cargarTrabajadores();
      }
    });
  }

  verDetalles(trabajador: any, tipo: string) {
    console.log(trabajador);

    if (tipo === 'TPC') {
      // trabajador = trabajador.trabajador;
    }

    if (tipo === 'CONTRATO') {
      trabajador = trabajador;
    }

    if (tipo === 'FRECUENTE') {
      trabajador = trabajador.trabajadorFrecuente;
    }

    let dialog = this.dialog.open(TrabajadorDetailGuardiaComponent, {
      width: '1000px',
      height: 'auto',
      data: {
        trabajador: trabajador,
        tipo: tipo
      }
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  cargarTrabajadores() {
    this.isLoading = true;
    let promises = [this.cargarTrabajadoresTPC(), this.cargarTrabajadoresContratos(), this.cargarTrabajadoresFrecuentes()];
    Promise.all(promises)
      .then((res: any[]) => {
        console.log(res);
        let [resTPC, restContratos, resFrecuente] = res;
        this.listTrabajadoresTPC = resTPC;
        this.dataSourceTPC = new MatTableDataSource(this.listTrabajadoresTPC);
        this.dataSourceTPC.paginator = this.tableTPCPaginator;
        this.dataSourceTPC.sort = this.tableTPCSort;

        this.listaTrabajadoresContrato = restContratos;
        this.dataSourceContrato = new MatTableDataSource(this.listaTrabajadoresContrato);
        this.dataSourceContrato.paginator = this.tableContratoPaginator;
        this.dataSourceContrato.sort = this.tableContratoSort;

        this.listaTrabajadoresFrecuentes = resFrecuente;
        this.dataSourceFrecuente = new MatTableDataSource(this.listaTrabajadoresFrecuentes);
        this.dataSourceFrecuente.paginator = this.tableFrecuentePaginator;
        this.dataSourceFrecuente.sort = this.tableFrecuenteSort;

        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          footer: 'Inténtalo de nuevo',
        })
      })
    // this.cargarTrabajadoresFrecuentes();
    // this.cargarTrabajadoresTPC();
    // this.cargarTrabajadoresContratos();
  }

  cargarTrabajadoresFrecuentes() {
    // nombrada-diaria
    return new Promise((resolve, reject) => {
      this.api.GET('/nombrada-diaria/hoy')
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        })
    })
  }

  cargarTrabajadoresTPC(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.GET(`/trabajadores-tpc`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        })
    })
  }

  cargarTrabajadoresContratos(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.api.GET(`/contrato-trabajador`)
        .then(res => {
          console.log(res);
          resolve(res);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
  }
}


