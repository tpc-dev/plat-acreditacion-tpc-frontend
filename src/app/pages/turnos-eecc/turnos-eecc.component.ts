import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/core/services/api/api.service';
import { EditTurnoComponent } from 'src/app/features/components/edit-turno/edit-turno.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnos-eecc',
  templateUrl: './turnos-eecc.component.html',
  styleUrls: ['./turnos-eecc.component.scss']
})
export class TurnosEeccComponent implements OnInit {
  listTurnos: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  dataSourceTurnos!: MatTableDataSource<any>;
  displayedColumns: string[] = ['nombre', 'activo', 'acciones'];
  fechaHoyString = moment().format('DD/MM/YYYY');
  contratoId: number;
  isLoading: boolean = false;
  constructor(public api: ApiService, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });
  }

  ngOnInit(): void {
    this.obtenerTurnosContrato();
  }

  obtenerTurnosContrato() {
    this.isLoading = true;
    this.api.GET(`/contratos/${this.contratoId}/turnos`)
      .then(res => {
        this.listTurnos = res;
        this.dataSourceTurnos = new MatTableDataSource(this.listTurnos);
        this.dataSourceTurnos.paginator = this.paginator;
        this.dataSourceTurnos.sort = this.sort;
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los turnos del contrato',
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
    this.dataSourceTurnos.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSourceTurnos.filteredData);
    if (this.dataSourceTurnos.paginator) {
      this.dataSourceTurnos.paginator.firstPage();
    }
  }

  editarTurno(turno: any) {
    console.log(turno);
    const dialogRef = this.dialog.open(EditTurnoComponent, {
      width: '800px',
      height: 'auto',
      data: {
        turno: turno
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.obtenerTurnosContrato();
      }
    });
  }

}
