import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoRol } from 'src/app/core/interfaces/cuenta.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-buscador-tipos-roles',
  templateUrl: './tabla-buscador-tipos-roles.component.html',
  styleUrls: ['./tabla-buscador-tipos-roles.component.scss']
})
export class TablaBuscadorTiposRolesComponent implements OnInit {

  @Input() listaTiposRoles: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'acciones'];
  @Output() actualizarListado = new EventEmitter();
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    // console.log(this.listaGerencias);

    this.dataSource = new MatTableDataSource(this.listaTiposRoles);
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

  editarNombreTipoRol(tipoRol: TipoRol) {
    Swal.fire({
      title: 'Ingrese nuevo nombre del tipo de rol',
      input: 'text',
      inputValue: tipoRol.nombre,
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
      if (nombre && nombre.length > 0 && tipoRol.nombre != nombre && result.isConfirmed) {
        let aux = { ...tipoRol };
        aux.nombre = nombre;
        this.api.PUT(`/tipo-roles/${tipoRol.id}`, aux)
          .then(() => {
            this.actualizarListado.emit();
            Swal.fire({
              title: 'Cambios Guardados',
            })
          })
          .catch(err => {
            console.log(err);
            Swal.fire('Error', 'No se pudo guardar los cambios', 'error');
          });
      }
    })
  }
}
