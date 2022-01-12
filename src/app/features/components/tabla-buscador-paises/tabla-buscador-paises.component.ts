import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

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
  displayedColumns: string[] = ['nombre', 'activo', 'acciones'];
  @Output() actualizarListado = new EventEmitter();
  constructor(public dialog: MatDialog, public api: ApiService) { }

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

  recargarPaises(): void {
    // this.obtenerVisitasActivas();
    this.actualizarListado.emit();
  }

  editar(pais: any): void {
    Swal.fire({
      title: 'Ingrese nuevo nombre del País',
      input: 'text',
      inputValue: pais.nombre,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      preConfirm: (nombre) => {
        console.log(nombre);
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result: any) => {
      console.log(result);
      const { value: nombre } = result;
      console.log(nombre);
      if (nombre && nombre.length > 0 && pais.nombre != nombre && result.isConfirmed) {
        let aux = { ...pais };
        aux.nombre = nombre;
        this.api.PUT(`/paises/${pais.id}`, aux)
          .then(() => {
            this.actualizarListado.emit();
            Swal.fire({
              title: 'Cambios Guardados',
            })
          })
          .catch((err: any) => {
            console.log(err);
            Swal.fire('Error', 'No se pudo guardar los cambios. ' + err.error, 'error');
          });
      }
    })
  }

  cambiarEstado(pais: any): void {
    const aux = { ...pais };
    aux.activo = !aux.activo;

    //Swal de confirmación
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea ${aux.activo ? 'activar' : 'desactivar'} el país ${pais.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, cambiar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result: SweetAlertResult) => {
      console.log(result);
      if (result.isConfirmed) {
        this.api.PUT(`/paises/${pais.id}/estado`, aux.activo)
          .then(() => {
            this.actualizarListado.emit();
            Swal.fire({
              title: 'Cambios Guardados',
            })
          })
          .catch((err: any) => {
            console.log(err);
            Swal.fire('Error', 'No se pudo guardar los cambios. ' + err.error, 'error');
          });
      }
    })
  }

}
