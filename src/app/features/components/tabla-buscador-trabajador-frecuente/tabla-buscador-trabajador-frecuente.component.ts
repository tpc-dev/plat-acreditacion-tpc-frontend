import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabla-buscador-trabajador-frecuente',
  templateUrl: './tabla-buscador-trabajador-frecuente.component.html',
  styleUrls: ['./tabla-buscador-trabajador-frecuente.component.scss']
})
export class TablaBuscadorTrabajadorFrecuenteComponent implements OnInit {

  @Input() listaTrabajadores: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['rut', 'nombre', 'apellidos'];
  @Output() actualizarListado = new EventEmitter();
  constructor(public router: Router, public activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listaTrabajadores);
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

  // recargarTrabajadores(): void {
  //   // this.obtenerVisitasActivas();
  //   this.actualizarListado.emit();
  // }

  // verRequisitos(trabajador: any): void {
  //   console.log(trabajador);
  //   this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/trabajadores/requisitos`], { state: { data: trabajador } });
  // }
}
