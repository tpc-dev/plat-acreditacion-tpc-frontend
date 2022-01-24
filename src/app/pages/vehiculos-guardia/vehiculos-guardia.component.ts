import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ProtocoloIngreso } from 'src/app/core/interfaces/protocoloingreso.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { RegistroAccesoVehiculoContratoComponent } from 'src/app/features/components/registro-acceso-vehiculo-contrato/registro-acceso-vehiculo-contrato.component';
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
  isProtocoloCovidActivo = false;
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

  marcarIngreso(vehiculoContrato: any) {
    console.log(vehiculoContrato);
    let dialog = this.dialog.open(RegistroAccesoVehiculoContratoComponent, {
      width: '1000px',
      height: 'auto',
      data: {
        vehiculoContrato: vehiculoContrato, isProtocoloCovidActivo: this.isProtocoloCovidActivo
      }
    });

    dialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.obtenerVehiculos();
      }
    });
    // Swal.fire({
    //   title: '¿Está seguro?',
    //   text: '¿Desea marcar el ingreso del vehiculo?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Aceptar'
    // }).then((result) => {
    //   if (result.value) {
    //     this.isLoading = true;
    //     this.api.POST(`/vehiculos/${vehiculo.id}/marcar-ingreso`, {
    //       fecha_ingreso: this.fechaHoyString
    //     })
    //       .then(res => {
    //         this.isLoading = false;
    //         Swal.fire({
    //           title: 'Exito',
    //           text: 'Se marco el ingreso del vehiculo',
    //           icon: 'success',
    //           confirmButtonText: 'Aceptar'
    //         });
    //         this.obtenerVehiculos();
    //       })
    //       .catch(err => {
    //         this.isLoading = false;
    //         Swal.fire({
    //           title: 'Error',
    //           text: 'No se pudo marcar el ingreso del vehiculo',
    //           icon: 'error',
    //           confirmButtonText: 'Aceptar'
    //         });
    //         console.log(err);
    //       });
    //   }
    // });
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

  obtenerProtocolos() {
    this.api.GET('/protocolos-ingreso')
      .then(data => {
        if (data.length == 0) return;
        let protocoloCovid = data.find((protocolo: ProtocoloIngreso) => protocolo.nombre.toLocaleLowerCase().includes("covid"));
        this.isProtocoloCovidActivo = protocoloCovid.activo;
      })
      .catch(err => {
        console.log(err);
        Swal.fire(
          'Ha ocurrido un error',
          'No se pudo cargar los protocolos.',
          'error'
        )
      });
  }
}