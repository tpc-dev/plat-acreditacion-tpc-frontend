import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/services/api/api.service';
import { VehiculoDetailGuardiaComponent } from 'src/app/features/components/vehiculo-detail-guardia/vehiculo-detail-guardia.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-guardia',
  templateUrl: './vehiculos-guardia.component.html',
  styleUrls: ['./vehiculos-guardia.component.scss']
})
export class VehiculosGuardiaComponent implements AfterViewInit {
  fechaHoyString = moment().format('DD/MM/YYYY');
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['patente', 'marca', 'modelo', 'chofer', 'acciones'];
  isLoading = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contratoId: number;
  listaVehiculos: any[] = [];
  constructor(public api: ApiService, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });

  }

  ngOnInit() {
    this.obtenerVehiculos();
  }

  obtenerVehiculos() {
    this.isLoading = true;
    // this.api.GET(`/vehiculos`)
    this.api.GET(`/contrato-vehiculo/acreditados`)
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

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  marcarIngreso(vehiculo: any) {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea marcar el ingreso del vehiculo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.value) {
        this.isLoading = true;
        this.api.POST(`/vehiculos/${vehiculo.id}/marcar-ingreso`, {
          fecha_ingreso: this.fechaHoyString
        })
          .then(res => {
            this.isLoading = false;
            Swal.fire({
              title: 'Exito',
              text: 'Se marco el ingreso del vehiculo',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.obtenerVehiculos();
          })
          .catch(err => {
            this.isLoading = false;
            Swal.fire({
              title: 'Error',
              text: 'No se pudo marcar el ingreso del vehiculo',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
            console.log(err);
          });
      }
    });
  }

  verDetalles(vehiculo: any) {
    console.log(vehiculo);
    
    let dialog = this.dialog.open(VehiculoDetailGuardiaComponent, {
      width: '800px',
      height: 'auto',
      data: {
        vehiculo: vehiculo
      }
    });
    dialog.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}