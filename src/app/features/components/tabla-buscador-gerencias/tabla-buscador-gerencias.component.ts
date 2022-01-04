import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { EditGerenciaAdminComponent } from '../edit-gerencia-admin/edit-gerencia-admin.component';

@Component({
  selector: 'app-tabla-buscador-gerencias',
  templateUrl: './tabla-buscador-gerencias.component.html',
  styleUrls: ['./tabla-buscador-gerencias.component.scss']
})
export class TablaBuscadorGerenciasComponent implements OnInit {

  @Input() listaGerencias: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'activo', 'acciones'];
  @Output() actualizarListado = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.listaGerencias);

    this.dataSource = new MatTableDataSource(this.listaGerencias);
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

  editarGerencia(gerencia: any): void {
    let dialogRef = this.dialog.open(EditGerenciaAdminComponent, {
      width: '500px',
      data: {
        gerencia: gerencia
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recargarGerencias();
      }
    });
  }

}
