import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Cargo } from 'src/app/core/interfaces/cargo.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargos-eecc',
  templateUrl: './cargos-eecc.component.html',
  styleUrls: ['./cargos-eecc.component.scss']
})
export class CargosEeccComponent implements OnInit {

  listCargos: Cargo[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSourceCargos!: MatTableDataSource<Cargo>;
  displayedColumns: string[] = ['nombre', 'activo', 'acciones'];
  fechaHoyString = moment().format('DD/MM/YYYY');
  contratoId: number;
  isLoading: boolean = false;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService,
    public dialog: MatDialog, public activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });
  }

  ngOnInit(): void {
    this.obtenerCargosContrato();
  }

  obtenerCargosContrato() {
    this.isLoading = true;
    this.api.GET(`/contratos/${this.contratoId}/cargos`)
      .then(res => {
        this.listCargos = res;
        this.dataSourceCargos = new MatTableDataSource(this.listCargos);
        this.dataSourceCargos.paginator = this.paginator;
        this.dataSourceCargos.sort = this.sort;
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los cargos del contrato',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }).finally(() => {
        this.isLoading = false;
      });
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSourceCargos.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSourceCargos.filteredData);
    if (this.dataSourceCargos.paginator) {
      this.dataSourceCargos.paginator.firstPage();
    }
  }

  cambiarEstadoCargo(cargo: Cargo) {
    let auxCargo = { ...cargo };
    auxCargo.activo = !auxCargo.activo;
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro de cambiar el estado del cargo ${auxCargo.nombre}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.api.PUT(`/cargos/${auxCargo.id}`, auxCargo)
          .then(res => {
            console.log(res);
            Swal.fire({
              title: 'Cambio de estado',
              text: `El estado del cargo ${auxCargo.nombre} ha sido cambiado`,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.obtenerCargosContrato();
          })
          .catch(err => {
            console.log(err);
            Swal.fire({
              title: 'Error',
              text: 'No se pudo cambiar el estado del cargo',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });
      }
    });
  }

}
