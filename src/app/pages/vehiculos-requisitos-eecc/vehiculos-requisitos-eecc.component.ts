import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-vehiculos-requisitos-eecc',
  templateUrl: './vehiculos-requisitos-eecc.component.html',
  styleUrls: ['./vehiculos-requisitos-eecc.component.scss']
})
export class VehiculosRequisitosEeccComponent implements OnInit {
  @Input() listaRequisitos: any[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatDatepickerInput) datepicker!: MatDatepickerInput<Date>;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] =
    [
      'nombre',
      'activo',
      'fechaInicio',
      'fechaTermino',
      'estado',
      'archivo',
      'acciones'
    ];
  @Output() actualizarListado = new EventEmitter();
  data: any;
  listItemsCarpetaArranque: any[] = [];
  listDocumentosRequeridos: any[] = [];
  ID_DOCUMENTO_REQUERIDO = 5;
  constructor(public api: ApiService, public router: Router, public activeRoute: ActivatedRoute) {
    this.data = this.router.getCurrentNavigation()?.extras.state?.data;
    console.log(this.router.getCurrentNavigation()?.extras.state);
    if (!this.data) {
      this.router.navigate(['../'], { relativeTo: this.activeRoute });
    }
  }



  ngOnInit(): void {
    this.obtenerRequisitos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerRequisitos() {
    // obtener carpeta de arranque por contrato id
    let carpetaArranque: any;
    this.api.GET(`/contratos/${this.data.contratoId}/carpeta-arranque`)
      .then(resp => {
        console.log(resp);
        carpetaArranque = resp;
        return this.api.GET(`/tipo-documento-acreditacion`);
      })
      .then((resp: any) => {
        console.log(resp);
        this.listDocumentosRequeridos = resp;
        return this.api.GET(`/carpeta-arranque/${carpetaArranque.id}/items`);
      })
      .then(resp => {
        this.listItemsCarpetaArranque = resp.map((requisito: any) => requisito.itemCarpetaArranque.id);
        console.log(resp);
        this.listDocumentosRequeridos = this.listDocumentosRequeridos.filter((requisito: any) => requisito.itemCarpetaArranqueId == this.listItemsCarpetaArranque.find((item: any) => item == requisito.itemCarpetaArranqueId));
        this.listaRequisitos = this.listDocumentosRequeridos.filter((requisito: any) => requisito.documentoClasificacionId == this.ID_DOCUMENTO_REQUERIDO);
        this.dataSource = new MatTableDataSource(this.listaRequisitos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch(err => {
        console.log(err);
      });
  }

  openDialog(requisito: any) {
    // const dialogRef = this.dialog.open(UploadTipoDocumentoComponent, {
    //   width: '650px',
    //   data: { ...visita }
    // });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   console.log(result);
    // });
  }
}
