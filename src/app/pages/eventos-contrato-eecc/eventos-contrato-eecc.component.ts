import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-eventos-contrato-eecc',
  templateUrl: './eventos-contrato-eecc.component.html',
  styleUrls: ['./eventos-contrato-eecc.component.scss']
})
export class EventosContratoEeccComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];
  constructor() { }

  ngOnInit(): void {
    let list = [
      {
        nombre: 'Evento Expiracion',
        descripcion: 'Contrato cerca de expiracion'
      },
      {
        nombre: 'Evento Expiracion',
        descripcion: 'Documentos cerca de expiracion'
      },
      {
        nombre: 'Evento Expiracion',
        descripcion: 'Trabajador cerca de expiracion'
      },
    ];
    this.dataSource = new MatTableDataSource(list);
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

}
