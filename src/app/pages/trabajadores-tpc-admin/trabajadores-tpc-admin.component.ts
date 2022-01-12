import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { TipoTrabajador } from 'src/app/core/enums/tipo-trabajadores';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajadores-tpc-admin',
  templateUrl: './trabajadores-tpc-admin.component.html',
  styleUrls: ['./trabajadores-tpc-admin.component.scss']
})
export class TrabajadoresTpcAdminComponent implements OnInit {
  fechaHoyString = moment().format('DD/MM/YYYY');
  listTrabajadoresFrecuentes: any[] = [];
  listTrabajadoresContrato: any[] = [];
  listTrabajadoresTPC: any[] = [];
  displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'acciones'];
  isLoading = false;
  tiposTrabjador = TipoTrabajador;
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.cargarTrabajadores()
  }

  // applyFilter(event: Event) {

  //   const filterValue = (event.target as HTMLInputElement).value;
  //   console.log(filterValue);
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   console.log(this.dataSource.filteredData);
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  cargarTrabajadores() {
    this.isLoading = true;
    let promises = [this.cargarTrabajadoresTPC(), this.cargarTrabajadoresFrecuentes(), this.cargarTrabajadoresContratos()];
    Promise.all(promises)
      .then((res: any[]) => {
        console.log(res);
        let [resTPC, resFrecuentes, resContrato] = res;
        this.listTrabajadoresTPC = resTPC;
        this.listTrabajadoresFrecuentes = resFrecuentes;
        this.listTrabajadoresContrato = resContrato;
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
    return new Promise((resolve, reject) => {
      this.api.GET(`/trabajadores-frecuentes`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.log(err);
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

  cargarTrabajadoresContratos() {
    return new Promise((resolve, reject) => {
      this.api.GET(`/contrato-trabajador`)
        .then(res => {
          console.log(res);
          res = res.map((item: any) => {
            let trabajador = item.trabajador;
            return trabajador;
          })
          resolve(res);
        })
        .catch(err => {
          reject(err);
          console.log(err);
        });
    });
  }

}
