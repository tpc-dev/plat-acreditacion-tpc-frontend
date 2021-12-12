import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';

@Component({
  selector: 'app-tabla-buscador-areas',
  templateUrl: './tabla-buscador-areas.component.html',
  styleUrls: ['./tabla-buscador-areas.component.scss']
})
export class TablaBuscadorAreasComponent implements OnInit {

  @Input() listaAreas: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<Empresa>;
  displayedColumns: string[] = ['nombre', 'activo','acciones'];
  @Output() actualizarListado = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listaAreas);
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

  regarcarAreas(): void {
    // this.obtenerVisitasActivas();
    this.actualizarListado.emit();
  }

}
