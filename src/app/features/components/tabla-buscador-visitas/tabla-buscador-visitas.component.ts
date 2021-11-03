import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Data } from '@angular/router';
import * as moment from 'moment';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import Swal from 'sweetalert2';
import { VisitaDetailComponent } from '../visita-detail/visita-detail/visita-detail.component';

@Component({
  selector: 'app-tabla-buscador-visitas',
  templateUrl: './tabla-buscador-visitas.component.html',
  styleUrls: ['./tabla-buscador-visitas.component.scss']
})
export class TablaBuscadorVisitasComponent implements OnInit {
  @Input() listaVisitas: Visita[] = [];
  @Input() showDateSearch: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  minDate: Date;
  dataSourceVisitas!: MatTableDataSource<Visita>;
  displayedColumns: string[] = ['rut', 'nombre', 'area', 'encargado', 'fechavisita', 'comentario', 'acciones'];
  @Output() actualizarListado = new EventEmitter();
  fechaBuscada!: Date;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService, public dialog: MatDialog) {
    this.minDate = moment().toDate();
  }

  ngOnInit(): void {
    console.log(this.listaVisitas)
    this.dataSourceVisitas = new MatTableDataSource(this.listaVisitas);
    this.dataSourceVisitas.paginator = this.paginator;
    this.dataSourceVisitas.sort = this.sort;
    this.dataSourceVisitas.filterPredicate =
      (data: Visita, filter: string) => moment(data.fechaVisita).format('DD/MM/YYY') == moment(filter).format('DD/MM/YYY');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceVisitas.filter = filterValue.trim().toLowerCase();
    if (this.dataSourceVisitas.paginator) {
      this.dataSourceVisitas.paginator.firstPage();
    }
  }


  marcarIngresoVisita(visita: Visita): void {
    console.log(visita)
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

  editarCamposVisita(visita: Visita): void {
    console.log(visita)
    this.openDialog(visita)
  }

  openDialog(visita: Visita): void {
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
    this.dataSourceVisitas.filter = this.datepicker.value ? moment(this.datepicker.value).format() : '';
    if (this.dataSourceVisitas.paginator) {
      this.dataSourceVisitas.paginator.firstPage();
    }
  }

  recargarVisitas(): void {
    // this.obtenerVisitasActivas();
    this.actualizarListado.emit();
  }
}