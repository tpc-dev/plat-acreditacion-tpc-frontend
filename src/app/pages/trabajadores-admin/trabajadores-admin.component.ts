import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajadores-admin',
  templateUrl: './trabajadores-admin.component.html',
  styleUrls: ['./trabajadores-admin.component.scss']
})
export class TrabajadoresAdminComponent implements OnInit {
  listTrabajadores: any[] = [];
  @Input() etapa: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  minDate: Date;
  dataSource!: MatTableDataSource<Visita>;
  displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'acciones'];
  @Output() actualizarListado = new EventEmitter();
  fechaBuscada!: Date;
  estadoBuscado: boolean = false;
  isProtocoloCovidActivo = false;
  fechaHoyString = moment().format('DD/MM/YYYY');
  tipoRolId?: number;
  usuario: Usuario;
  isLoading = false;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute,
    public auth: AuthService) {
    this.tipoRolId = this.auth.getCuentaActivaValue().usuario.tipoRolId;
    this.usuario = this.auth.getCuentaActivaValue().usuario;
  }

  ngOnInit(): void {
    this.obtenerTrabajadores();
  }

  onFechaChange() {

  }

  obtenerTrabajadores() {
    this.isLoading = true;
    // this.api.GET('/trabajadores-frecuentes')
    this.api.GET(`/usuarios/${this.usuario.id}/trabajadores-frecuentes`)
      .then(data => {
        this.listTrabajadores = data;
        this.dataSource = new MatTableDataSource(this.listTrabajadores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.listTrabajadores);
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
          footer: 'Inténtalo de nuevo'
        });
      });
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
