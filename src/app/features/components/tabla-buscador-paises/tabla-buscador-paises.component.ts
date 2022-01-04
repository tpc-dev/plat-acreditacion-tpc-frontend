import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tabla-buscador-paises',
  templateUrl: './tabla-buscador-paises.component.html',
  styleUrls: ['./tabla-buscador-paises.component.scss']
})
export class TablaBuscadorPaisesComponent implements OnInit {


  @Input() listaPaises: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'activo'];
  @Output() actualizarListado = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.listaPaises);

    this.dataSource = new MatTableDataSource(this.listaPaises);
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
    // let dialogRef = this.dialog.open(EditGerenciaAdminComponent, {
    //   width: '500px',
    //   data: {
    //     gerencia: gerencia
    //   }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.recargarGerencias();
    //   }
    // });
  }

}
