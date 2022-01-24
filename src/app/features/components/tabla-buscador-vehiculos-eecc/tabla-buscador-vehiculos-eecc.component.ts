import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EditVehiculoComponent } from '../edit-vehiculo/edit-vehiculo.component';

@Component({
  selector: 'app-tabla-buscador-vehiculos-eecc',
  templateUrl: './tabla-buscador-vehiculos-eecc.component.html',
  styleUrls: ['./tabla-buscador-vehiculos-eecc.component.scss']
})
export class TablaBuscadorVehiculosEeccComponent implements OnInit {

  @Input() listaVehiculos: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['patente', 'marca', 'chofer', 'requisitos', 'estado','acciones'];
  @Output() actualizarListado = new EventEmitter();
  contratoId: any;
  tipoRolId: number;
  constructor(public auth: AuthService, public router: Router, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    this.tipoRolId = auth.getCuentaActivaValue().usuario.tipoRolId;
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.contratoId = params.id;
    });
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.listaVehiculos);
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

  recargar(): void {
    // this.obtenerVisitasActivas();
    this.actualizarListado.emit();
  }

  verRequisitos(vehiculo: any): void {
    console.log(vehiculo);

    if (this.tipoRolId === 5) {
      this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/vehiculos/requisitos`], { state: { data: vehiculo } });
    } else if (this.tipoRolId == 4) {
      this.router.navigate([`/contratos-gestion-tpc/${this.contratoId}/vehiculos/requisitos`], { state: { data: vehiculo } });
    }
  }

  editarVehiculo(vehiculo: any) {
    console.log(vehiculo);
    const dialogRef = this.dialog.open(EditVehiculoComponent, {
      width: '1000px',
      height: 'auto',
      data: {
        vehiculo: vehiculo
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      if (result) {
        this.recargar();
      }
    });
  }
}
