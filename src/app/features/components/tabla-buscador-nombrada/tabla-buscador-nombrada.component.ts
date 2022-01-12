import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';
import { ListaTrabajadoresNombradaComponent } from '../lista-trabajadores-nombrada/lista-trabajadores-nombrada.component';

@Component({
  selector: 'app-tabla-buscador-nombrada',
  templateUrl: './tabla-buscador-nombrada.component.html',
  styleUrls: ['./tabla-buscador-nombrada.component.scss']
})
export class TablaBuscadorNombradaComponent implements OnInit {
  listNombrada: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Fecha', 'HoraInicio', 'HoraFin', 'Acciones'];
  @Output() actualizarListado = new EventEmitter();
  fechaBuscada!: Date;
  isLoading = false;
  usuario: Usuario;
  constructor(public dialog: MatDialog, public api: ApiService, public auth: AuthService) {
    this.usuario = this.auth.getCuentaActivaValue().usuario;
  }

  ngOnInit(): void {
    this.obtenerNombradasUsuario();
    // console.log(this.listNombrada);

    // this.dataSource = new MatTableDataSource(this.listNombrada);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  obtenerNombradasUsuario(): void {
    // listNombrada
    this.isLoading = true;
    this.api.GET('/nombrada-diaria/encargado/' + this.usuario.id)
      .then((res: any) => {
        this.listNombrada = res;
        this.dataSource = new MatTableDataSource(this.listNombrada);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo obtener resultados!',
        });
        this.isLoading = false;
        console.log(err);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  recargarNombrada(): void {
    // this.obtenerVisitasActivas();
    this.actualizarListado.emit();
  }

  onFechaChange(): void {
    this.dataSource.filterPredicate = (data: any, filter: string) => moment(data.fecha).format('DD/MM/YYY') == moment(filter).format('DD/MM/YYY');
    this.dataSource.filter = this.datepicker.value ? moment(this.datepicker.value).format() : '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  verTrabajadores(nombrada: any): void {
    this.dialog.open(ListaTrabajadoresNombradaComponent, {
      width: '800px',
      data: {
        nombrada: nombrada
      }
    });
  }

}
