import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-guardia',
  templateUrl: './vehiculos-guardia.component.html',
  styleUrls: ['./vehiculos-guardia.component.scss']
})
export class VehiculosGuardiaComponent implements AfterViewInit {
  fechaHoyString = moment().format('DD/MM/YYYY');
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['patente', 'marca', 'año', 'acciones'];
  isLoading = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contratoId: number;
  listaVehiculos: any[] = [];
  constructor(public api: ApiService, public activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });

  }

  ngOnInit() {
    this.obtenerTrabajadores();
  }

  obtenerTrabajadores() {
    this.isLoading = true;
    this.api.GET(`/vehiculos`)
      .then(res => {
        this.isLoading = false;
        this.listaVehiculos = res;
        this.dataSource = new MatTableDataSource(this.listaVehiculos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los vehiculos del contrato',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}