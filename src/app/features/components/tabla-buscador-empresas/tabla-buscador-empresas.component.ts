import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { Visita } from 'src/app/core/interfaces/visita.interface';

@Component({
  selector: 'app-tabla-buscador-empresas',
  templateUrl: './tabla-buscador-empresas.component.html',
  styleUrls: ['./tabla-buscador-empresas.component.scss']
})
export class TablaBuscadorEmpresasComponent implements OnInit {
  @Input() listaEmpresas: Empresa[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<Empresa>;
  displayedColumns: string[] = ['rut', 'razonsocial', 'estadoacreditacion'];
  @Output() actualizarListado = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listaEmpresas);
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

  regarcarEmpresas(): void {
    // this.obtenerVisitasActivas();
    this.actualizarListado.emit();
  }


}
