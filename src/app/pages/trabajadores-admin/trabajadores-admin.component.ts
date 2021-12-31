import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';

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
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute,
    public auth: AuthService) {
    this.tipoRolId = this.auth.getCuentaActivaValue().usuario.tipoRolId;
  }

  ngOnInit(): void {

    // this.dataSource = new MatTableDataSource(this.listTrabajadores);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.obtenerTrabajadores();
  }

  onFechaChange() {

  }

  obtenerTrabajadores() {

    this.api.GET('/trabajadores')
      .then(data => {
        this.listTrabajadores = data;
        this.dataSource = new MatTableDataSource(this.listTrabajadores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.listTrabajadores);
      })
      .catch(err => {
        console.log(err);
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

  verDetallesContrato(contrato: any) {
    console.log(contrato);
    this.router.navigateByUrl('contrato-detail', { state: { contrato: contrato, etapa: this.etapa } });
    //   this.router.navigate(['contrato-detail'], { relativeTo: this.route });
  }

  goToGestionarContrato(contrato: any) {
    if (this.tipoRolId == 5) {
      this.router.navigate(['/contratos-gestion-eecc', contrato.id]);
      return
    }

    if (this.tipoRolId == 4) {
      this.router.navigate(['/contratos-gestion-tpc', contrato.id]);
      return
    }
  }

}
