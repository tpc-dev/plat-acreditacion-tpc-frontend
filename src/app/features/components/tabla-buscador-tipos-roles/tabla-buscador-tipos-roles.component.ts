import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-buscador-tipos-roles',
  templateUrl: './tabla-buscador-tipos-roles.component.html',
  styleUrls: ['./tabla-buscador-tipos-roles.component.scss']
})
export class TablaBuscadorTiposRolesComponent implements OnInit {

  @Input() listaTiposRoles: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'activo','acciones'];
  @Output() actualizarListado = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    // console.log(this.listaGerencias);
    
    this.dataSource = new MatTableDataSource(this.listaTiposRoles);
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

  recargarGerencias(): void {
    // this.obtenerVisitasActivas();
    this.actualizarListado.emit();
  }
}
