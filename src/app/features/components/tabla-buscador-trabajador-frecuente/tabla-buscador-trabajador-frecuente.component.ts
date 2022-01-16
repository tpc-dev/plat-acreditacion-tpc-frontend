import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { EditTrabajadorFrecuenteComponent } from '../edit-trabajador-frecuente/edit-trabajador-frecuente.component';

@Component({
  selector: 'app-tabla-buscador-trabajador-frecuente',
  templateUrl: './tabla-buscador-trabajador-frecuente.component.html',
  styleUrls: ['./tabla-buscador-trabajador-frecuente.component.scss']
})
export class TablaBuscadorTrabajadorFrecuenteComponent implements OnInit {

  @Input() listaTrabajadores: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['rut', 'nombre', 'apellidos', 'acciones'];
  @Output() actualizarListado = new EventEmitter();
  constructor(public router: Router, public activeRoute: ActivatedRoute, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listaTrabajadores);
    console.log(this.sort);
    console.log(this.paginator);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(trabajador: any) {
    console.log(trabajador);
    let dialog = this.dialog.open(EditTrabajadorFrecuenteComponent, {
      width: '900px',
      data: {
        trabajador: trabajador
      }
    });
    dialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.actualizarListado.emit();
      }
    });
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
