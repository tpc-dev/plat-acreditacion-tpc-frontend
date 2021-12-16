import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-tabla-buscador-contratos',
  templateUrl: './tabla-buscador-contratos.component.html',
  styleUrls: ['./tabla-buscador-contratos.component.scss']
})
export class TablaBuscadorContratosComponent implements OnInit {
  @Input() listContratos: any[] = [];
  @Input() etapa: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  minDate: Date;
  dataSourceVisitas!: MatTableDataSource<Visita>;
  displayedColumns: string[] = ['codigocontrato', 'descripcion', 'area', 'fechainicio', 'fechatermino', 'empresa', 'acciones'];
  @Output() actualizarListado = new EventEmitter();
  fechaBuscada!: Date;
  estadoBuscado: boolean = false;
  isProtocoloCovidActivo = false;
  fechaHoyString = moment().format('DD/MM/YYYY');
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService, public dialog: MatDialog, public router: Router, private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    console.log(this.listContratos);

    this.dataSourceVisitas = new MatTableDataSource(this.listContratos);
    this.dataSourceVisitas.paginator = this.paginator;
    this.dataSourceVisitas.sort = this.sort;
  }

  onFechaChange() {

  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.dataSourceVisitas.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSourceVisitas.filteredData);
    if (this.dataSourceVisitas.paginator) {
      this.dataSourceVisitas.paginator.firstPage();
    }
  }

  verDetallesContrato(contrato: any) {
    console.log(contrato);
    this.router.navigateByUrl('contrato-detail', { state: { contrato: contrato, etapa: this.etapa } });
    //   this.router.navigate(['contrato-detail'], { relativeTo: this.route });
  }

}
