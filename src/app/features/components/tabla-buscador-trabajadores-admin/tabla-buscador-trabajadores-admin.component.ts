import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { TipoTrabajador } from 'src/app/core/enums/tipo-trabajadores';

@Component({
  selector: 'app-tabla-buscador-trabajadores-admin',
  templateUrl: './tabla-buscador-trabajadores-admin.component.html',
  styleUrls: ['./tabla-buscador-trabajadores-admin.component.scss']
})
export class TablaBuscadorTrabajadoresAdminComponent implements OnInit {
  @Input() listaTrabajadores: any[] = [];
  @Input() tipoTrabajador: TipoTrabajador;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[];
  @Output() actualizarListado = new EventEmitter();
  fechaHoyString = moment().format('DD/MM/YYYY');

  constructor() {
    
  }

  setDisplayedColumns(tipoTrabajador: TipoTrabajador): string[] {
    if (tipoTrabajador === TipoTrabajador.TPC)
      return ['rut', 'nombres', 'apellidos', 'gerencia', 'acciones'];

    if (tipoTrabajador === TipoTrabajador.CONTRATO)
      return ['rut', 'nombres', 'apellidos', 'acciones'];

    if (tipoTrabajador === TipoTrabajador.FRECUENTES)
      return ['rut', 'nombres', 'apellidos', 'acciones'];

    return ['rut', 'nombres', 'apellidos', 'acciones'];
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listaTrabajadores);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.setDisplayedColumns(this.tipoTrabajador);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
