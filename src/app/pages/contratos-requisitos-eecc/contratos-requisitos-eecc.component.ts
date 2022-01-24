import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DocumentoAcreditacionDetailComponent } from 'src/app/features/components/documento-acreditacion-detail/documento-acreditacion-detail.component';
import { UploadTipoDocumentoComponent } from 'src/app/features/components/upload-tipo-documento/upload-tipo-documento.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contratos-requisitos-eecc',
  templateUrl: './contratos-requisitos-eecc.component.html',
  styleUrls: ['./contratos-requisitos-eecc.component.scss']
})
export class ContratosRequisitosEeccComponent implements OnInit {
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
  contratoId: number;
  contratoCodigo: string;
  isLoading = false;
  tipoRolId: number;
  estadoAcreditacionId:number;
  constructor(public auth: AuthService, public api: ApiService, public router: Router, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    this.tipoRolId = this.auth.getCuentaActivaValue().usuario.tipoRolId;
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
      // this.contratoCodigo = params.contrato.codigo;
    });
    // if (!this.data) {
    //   this.router.navigate(['../'], { relativeTo: this.activeRoute });
    // }
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.obtenerRequisitosContrato();
    this.obtenerContratoTipoDocumentoEnProcesos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerRequisitosContrato() {
    // obtener carpeta de arranque por contrato id
    let carpetaArranque: any;
    this.api.GET(`/contratos/${this.contratoId}/carpeta-arranque`)
      .then(resp => {
        console.log(resp);
        this.contratoCodigo = resp.contrato.codigoContrato
        this.estadoAcreditacionId = resp.contrato.estadoAcreditacionId
        carpetaArranque = resp;
        return this.api.GET(`/tipo-documento-acreditacion`);
      })
      .then((resp: any) => {
        // console.log(resp);
        this.listDocumentosRequeridos = resp;
        return this.api.GET(`/carpeta-arranque/${carpetaArranque.id}/items`);
      })
      .then(resp => {
        // this.listaRequisitos = resp.map((requisito: any) => {
        this.listItemsCarpetaArranque = resp.map((requisito: any) => requisito.itemCarpetaArranque.id);
        // console.log(resp);

        // console.log(this.listItemsCarpetaArranque);
        this.listDocumentosRequeridos = this.listDocumentosRequeridos.filter((requisito: any) => requisito.itemCarpetaArranqueId == this.listItemsCarpetaArranque.find((item: any) => item == requisito.itemCarpetaArranqueId));
        this.listaRequisitos = this.listDocumentosRequeridos.filter((requisito: any) => requisito.documentoClasificacionId == 1);
        this.listaRequisitos = this.listaRequisitos.map((requisito: any) => {
          let aux = requisito;
          let documentoCreado = this.getDocument(requisito);
          aux.hasDocument = documentoCreado != null ? true : false;
          aux.fechaInicio = documentoCreado != null ? documentoCreado.fechaInicio : null;
          aux.fechaTermino = documentoCreado != null ? documentoCreado.fechaTermino : null;
          aux.estadoAcreditacion = documentoCreado != null ? documentoCreado.estadoAcreditacion : null;
          // aux.lastHistorico = this.obtenerUltimoHistorico(requisito);
          return aux;
        });
        // console.log(this.listaRequisitos);
        this.isLoading = false;
        this.dataSource = new MatTableDataSource(this.listaRequisitos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch(err => {
        console.log(err);
      });
  }

  getDocument(requisito: any) {
    let documento = this.listaDocumentosCreados.find((documento: any) => {
      return documento.tipoDocumentoAcreditacionId == requisito.id;
    });
    return documento;
  }

  obtenerContratoTipoDocumentoEnProcesos() {
    this.api.GET(`/contratos/${this.contratoId}/documentos-requeridos`)
      .then(resp => {
        console.log(resp);
        this.listaDocumentosCreados = resp;
      })
      .catch(err => {
        console.log(err);
      });
  }

  openUploadDialog(requisito: any) {
    // console.log(requisito);

    const dialogRef = this.dialog.open(UploadTipoDocumentoComponent, {
      width: '850px',
      height: '380px',
      data: { ...requisito, contratoId: this.contratoId, contratoCodigo: this.contratoCodigo }
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
      height: '680px',
      data: { ...documentoCreado, contratoId: this.contratoId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      this.loadData();
    });
  }

  obtenerUltimoHistorico(requisito: any) {
    // console.log(requisito.id);

    let documentoCreado = this.listaDocumentosCreados.find((documento: any) => {
      return documento.tipoDocumentoAcreditacionId == requisito.id;
    });

    if (!documentoCreado) return null;

    console.log(documentoCreado);
    let lastHistorico = documentoCreado.listHistoricosAcreditacionContratoTipoDocumentoAcreditacion.sort((a: any, b: any) => {
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
