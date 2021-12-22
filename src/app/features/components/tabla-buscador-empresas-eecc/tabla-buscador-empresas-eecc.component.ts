import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';

@Component({
  selector: 'app-tabla-buscador-empresas-eecc',
  templateUrl: './tabla-buscador-empresas-eecc.component.html',
  styleUrls: ['./tabla-buscador-empresas-eecc.component.scss']
})
export class TablaBuscadorEmpresasEeccComponent implements OnInit {
  @Input() listaEmpresas: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['rut', 'razonsocial', 'contrato', 'estado', 'requisitos'];
  @Output() actualizarListado = new EventEmitter();
  constructor(public router: Router) { }

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

  verRequisitos(empresaData: any) {
    // this.router.navigate(['item-carpeta-arranque-admin', 3]);
    this.router.navigate(['empresas-adceecc/requisitos'], { state: { data: empresaData } });
  }

}
