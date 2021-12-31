import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-trabajadores-tpc-admin',
  templateUrl: './trabajadores-tpc-admin.component.html',
  styleUrls: ['./trabajadores-tpc-admin.component.scss']
})
export class TrabajadoresTpcAdminComponent implements OnInit {
  fechaHoyString = moment().format('DD/MM/YYYY');
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'acciones'];

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filteredData);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
