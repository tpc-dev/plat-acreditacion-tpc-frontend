import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { DocumentoAcreditacionDetailComponent } from 'src/app/features/components/documento-acreditacion-detail/documento-acreditacion-detail.component';
import { UploadTipoDocumentoComponent } from 'src/app/features/components/upload-tipo-documento/upload-tipo-documento.component';

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
  listaDocumentosCreados: any[] = [];

  ID_DOCUMENTO_REQUERIDO = 5;
  isLoading = false;
  constructor(public api: ApiService, public router: Router, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    this.data = this.router.getCurrentNavigation()?.extras.state?.data;
    console.log(this.router.getCurrentNavigation()?.extras.state);
    if (!this.data) {
      this.router.navigate(['../'], { relativeTo: this.activeRoute });
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    // this.obtenerRequisitos();
    this.obtenerTipoDocumentoEnProcesos();
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
        this.listaRequisitos = this.listaRequisitos.map((requisito: any) => {
          let aux = requisito;
          aux.hasDocument = this.hasDocument(requisito);
          aux.lastHistorico = this.obtenerUltimoHistorico(requisito);
          return aux;
        });

        this.dataSource = new MatTableDataSource(this.listaRequisitos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
      });
  }

  hasDocument(requisito: any) {
    let existe = this.listaDocumentosCreados.find((documento: any) => {
      return documento.tipoDocumentoAcreditacionId == requisito.id;
    });
    return existe != null;
  }

  obtenerTipoDocumentoEnProcesos() {
    this.api.GET(`/contratos/${this.data.contratoId}/vehiculo/${this.data.vehiculoId}/documentos-requeridos`)
      .then(resp => {
        console.log(resp);
        this.listaDocumentosCreados = resp;
        this.obtenerRequisitos();
      })
      .catch(err => {
        console.log(err);
      });
  }

  openUploadDialog(requisito: any) {
    const dialogRef = this.dialog.open(UploadTipoDocumentoComponent, {
      width: '850px',
      height: '380px',
      data: { ...requisito, contratoId: this.data.contratoId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      this.loadData();
    });
  }

  verArchivoCreado(documento: any) {
    let documentoCreado = this.listaDocumentosCreados.find((documento: any) => {
      return documento.tipoDocumentoAcreditacionId == documento.tipoDocumentoAcreditacionId;
    });
    console.log(documentoCreado);
    const dialogRef = this.dialog.open(DocumentoAcreditacionDetailComponent, {
      width: '850px',
      height: '480px',
      data: { ...documentoCreado, contratoId: this.data.contratoId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      this.loadData();
    });
  }

  obtenerUltimoHistorico(requisito: any) {

    let documentoCreado = this.listaDocumentosCreados.find((documento: any) => {
      return documento.tipoDocumentoAcreditacionId == requisito.id;
    });

    if (!documentoCreado) return null;
    if (documentoCreado.listHistoricosAcreditacionVehiculoTipoDocumentoAcreditacion.length == 0) return null;
    console.log(documentoCreado);
    let lastHistorico = documentoCreado.listHistoricosAcreditacionVehiculoTipoDocumentoAcreditacion.sort((a: any, b: any) => {
      return b.id - a.id;
    })[0];
    console.log(lastHistorico);

    return this.getNameEstadoAcreditacion(lastHistorico.estadoAcreditacionId);
  }

  getNameEstadoAcreditacion(estado: any) {
    if (estado == 1) return 'Acreditado';
    if (estado == 2) return 'Pendiente';
    if (estado == 3) return 'Rechazado';

    return 'No definido';
  }
}
