import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import * as moment from 'moment';
import { ProtocoloIngreso } from 'src/app/core/interfaces/protocoloingreso.interface';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import Swal from 'sweetalert2';
import { FormularioProtocoloCovidComponent } from '../formulario-protocolo-covid/formulario-protocolo-covid.component';
import { VisitaDetailComponent } from '../visita-detail/visita-detail/visita-detail.component';
import { VisitaIngresosHistoricoComponent } from '../visita-ingresos-historico/visita-ingresos-historico.component';

@Component({
  selector: 'app-tabla-buscador-visitas',
  templateUrl: './tabla-buscador-visitas.component.html',
  styleUrls: ['./tabla-buscador-visitas.component.scss']
})
export class TablaBuscadorVisitasComponent implements OnInit {
  @Input() listaVisitas: Visita[] = [];
  @Input() showDateSearch: boolean = false;
  @Input() isAdministrador: boolean = false;
  @Input() candEdit: boolean = false;
  @Input() canMarcar: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  minDate: Date;
  dataSourceVisitas!: MatTableDataSource<Visita>;
  displayedColumns: string[] = ['rut', 'nombre', 'area', 'encargado', 'fechavisita', 'comentario', 'haIngresado', 'acciones'];
  @Output() actualizarListado = new EventEmitter();
  fechaBuscada!: Date;
  estadoBuscado: boolean = false;
  isProtocoloCovidActivo = false;
  fechaHoyString = moment().format('DD/MM/YYYY');
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    console.log(this.listaVisitas)
    this.obtenerProtocolos();
    if (this.candEdit || this.canMarcar) {
      this.minDate = moment().toDate();
    }
    this.dataSourceVisitas = new MatTableDataSource(this.listaVisitas);
    this.dataSourceVisitas.paginator = this.paginator;
    this.dataSourceVisitas.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSourceVisitas.paginator = this.paginator;
    this.dataSourceVisitas.sort = this.sort;
  }

  obtenerProtocolos() {
    this.api.GET('/protocolos-ingreso')
      .then(data => {
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

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSourceVisitas.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSourceVisitas.filteredData);
    if (this.dataSourceVisitas.paginator) {
      this.dataSourceVisitas.paginator.firstPage();
    }
  }

  ingresarTemperaturaVisita(visita: Visita): void {

    const dialogRef = this.dialog.open(FormularioProtocoloCovidComponent, {
      width: '850px',
      height: '680px',
      data: { ...visita }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ingresarVisita(visita);
        // this.actualizarListado.emit();
      }
    });
    // Swal.fire({
    //   title: 'Ingrese la temperatura',
    //   input: 'text',
    //   inputAttributes: {
    //     autocapitalize: 'off'
    //   },
    //   showCancelButton: true,
    //   confirmButtonText: 'Guardar',
    //   cancelButtonText: 'Cancelar',
    //   showLoaderOnConfirm: true,
    //   preConfirm: (login) => {
    //     console.log(login)
    //     // return fetch(`//api.github.com/users/${login}`)
    //     //   .then(response => {
    //     //     if (!response.ok) {
    //     //       throw new Error(response.statusText)
    //     //     }
    //     //     return response.json()
    //     //   })
    //     //   .catch(error => {
    //     //     Swal.showValidationMessage(
    //     //       `Request failed: ${error}`
    //     //     )
    //     //   })
    //   },
    //   allowOutsideClick: () => !Swal.isLoading()
    // }).then((result) => {
    //   console.log(result);

    //   // if (result.isConfirmed) {
    //   //   Swal.fire({
    //   //     title: `${result.value.login}'s avatar`,
    //   //     imageUrl: result.value.avatar_url
    //   //   })
    //   // }
    // })
  }

  ingresarVisita(visita: Visita): void {
    Swal.fire({
      title: '¿Desea marcar el ingreso de esta visita?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.marcarIngresoVisita(visita).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Ingreso Registrado!',
            'Se ha marcado el ingreso correctamente.',
            'success'
          )
          this.recargarVisitas();
        }, error => {
          console.log(error);
          Swal.fire(
            'Ha ocurrido un error!',
            'No se pudo registrar el acceso, intentalo nuevamente.',
            'error'
          )
        });
      }
    })
  }

  marcarIngresoVisita(visita: Visita): void {
    console.log(visita)
    if (this.isProtocoloCovidActivo) {
      this.ingresarTemperaturaVisita(visita);
    } else {
      this.ingresarVisita(visita);
    }
  }

  marcarSalidaVisita(visita: Visita): void {
    console.log(visita)
    Swal.fire({
      title: '¿Desea marcar la salida de esta visita?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.marcarSalidaVisita(visita).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Ingreso Registrado!',
            'Se ha marcado el ingreso correctamente.',
            'success'
          )
          this.recargarVisitas();
        }, error => {
          console.log(error);
          Swal.fire(
            'Ha ocurrido un error!',
            'No se pudo registrar el acceso, intentalo nuevamente.',
            'error'
          )
        });
      }
    })
  }

  cancelarVisita(visita: Visita): void {
    console.log(visita)
    Swal.fire({
      title: '¿Esta seguro que desea eliminar la visita agendada?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.cancelarVisita(visita).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Visita Agendada Eliminada!',
            'Se ha eleminiado  correctamente.',
            'success'
          )
          this.recargarVisitas();
        }, error => {
          console.log(error);
          Swal.fire(
            'Ha ocurrido un error!',
            'No se pudo eliminar el acceso, intentalo nuevamente.',
            'error'
          )
        });
      }
    })
  }

  verVisitaIngresosHistorico(visita: Visita): void {
    console.log(visita)
    this.openDialogVisitaIngresosHistorico(visita)
  }

  openDialogVisitaIngresosHistorico(visita: Visita): void {
    const dialogRef = this.dialog.open(VisitaIngresosHistoricoComponent, {
      width: '650px',
      data: { ...visita }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result) return;
      this.api.editarVisita(result).subscribe(res => {
        console.log(res)
        Swal.fire({
          title: 'Datos Actualizados',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
        this.recargarVisitas();
      }, (error: any) => {
        console.log(error);
        Swal.fire(
          'Ha ocurrido un error!',
          'No se pudo modificar la visita, intentalo nuevamente.',
          'error'
        )
      });
    });
  }

  editarCamposVisita(visita: Visita): void {
    console.log(visita)
    this.openDialogVisitaDetail(visita)
  }

  openDialogVisitaDetail(visita: Visita): void {
    const dialogRef = this.dialog.open(VisitaDetailComponent, {
      width: '650px',
      data: { ...visita }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result) return;
      this.api.editarVisita(result).subscribe(res => {
        console.log(res)
        Swal.fire({
          title: 'Datos Actualizados',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })
        this.recargarVisitas();
      }, (error: any) => {
        console.log(error);
        Swal.fire(
          'Ha ocurrido un error!',
          'No se pudo modificar la visita, intentalo nuevamente.',
          'error'
        )
      });
    });
  }

  onFechaChange(): void {
    this.dataSourceVisitas.filterPredicate = (data: Visita, filter: string) => moment(data.fechaVisita).format('DD/MM/YYY') == moment(filter).format('DD/MM/YYY');
    this.dataSourceVisitas.filter = this.datepicker.value ? moment(this.datepicker.value).format() : '';
    if (this.dataSourceVisitas.paginator) {
      this.dataSourceVisitas.paginator.firstPage();
    }
  }

  onEstadoChange(): void {
    console.log(this.estadoBuscado)
    this.dataSourceVisitas.filterPredicate = (data: Visita, filter: string) => data.haIngresado?.toString() == filter;
    this.dataSourceVisitas.filter = this.estadoBuscado ? 'true' : 'false';
    if (this.dataSourceVisitas.paginator) {
      this.dataSourceVisitas.paginator.firstPage();
    }
  }

  recargarVisitas(): void {
    // this.obtenerVisitasActivas();
    this.actualizarListado.emit();
  }
}
