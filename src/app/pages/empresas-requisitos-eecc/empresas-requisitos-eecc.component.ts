import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UploadTipoDocumentoComponent } from 'src/app/features/components/upload-tipo-documento/upload-tipo-documento.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empresas-requisitos-eecc',
  templateUrl: './empresas-requisitos-eecc.component.html',
  styleUrls: ['./empresas-requisitos-eecc.component.scss']
})
export class EmpresasRequisitosEeccComponent implements OnInit {
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
  tipoRolId: number;
  constructor(public auth: AuthService, public api: ApiService, public router: Router, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    this.tipoRolId = this.auth.getCuentaActivaValue().usuario.tipoRolId;
    this.data = this.router.getCurrentNavigation()?.extras.state?.data;
    console.log(this.router.getCurrentNavigation()?.extras.state);
    if (!this.data) {
      this.router.navigate(['../'], { relativeTo: this.activeRoute });
    }
  }



  ngOnInit(): void {
    // console.log(this.listaRequisitos);
    this.loadData();
    // this.dataSource = new MatTableDataSource(this.listaRequisitos);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  loadData() {
    this.obtenerRequisitosEmpresa();
    this.obtenerEmpresaContratoTipoDocumento();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerRequisitosEmpresa() {
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
        // this.listaRequisitos = resp.map((requisito: any) => {
        this.listItemsCarpetaArranque = resp.map((requisito: any) => requisito.itemCarpetaArranque.id);
        // console.log(resp);

        // console.log(this.listItemsCarpetaArranque);
        this.listDocumentosRequeridos = this.listDocumentosRequeridos.filter((requisito: any) => requisito.itemCarpetaArranqueId == this.listItemsCarpetaArranque.find((item: any) => item == requisito.itemCarpetaArranqueId));
        this.listaRequisitos = this.listDocumentosRequeridos.filter((requisito: any) => requisito.documentoClasificacionId == 2);
        console.log(this.listaRequisitos);
        this.listaRequisitos = this.listaRequisitos.map((requisito: any) => {
          let aux = requisito;
          let documentoCreado = this.getDocument(requisito);
          aux.hasDocument = documentoCreado != null ? true : false;
          aux.fechaInicio = documentoCreado != null ? documentoCreado.fechaInicio : null;
          aux.fechaTermino = documentoCreado != null ? documentoCreado.fechaTermino : null;
        //  aux.lastHistorico = this.obtenerUltimoHistorico(requisito);
          return aux;
        });
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


  obtenerEmpresaContratoTipoDocumento() {
    this.api.GET(`/contratos/${this.data.contratoId}/empresas/${this.data.empresaId}/documentos-requeridos`)
      .then(resp => {
        console.log(resp);
        this.listaDocumentosCreados = resp;
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

  acreditar() {
    let documentosPendientes = this.listaDocumentosCreados.filter((documento: any) => {
      return documento.estadoAcreditacionId != 1;
    });

    console.log(this.listaDocumentosCreados.length)
    console.log(this.listaRequisitos.length)

    console.log(documentosPendientes);

    if (this.listaDocumentosCreados.length < this.listaRequisitos.length || documentosPendientes.length > 0) {
      Swal.fire({
        title: '¿Está seguro de acreditar el contrato?',
        text: 'Tienes documentos que no han sido acreditados. Una vez acreditado, no podrá realizar cambios',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, acreditar contrato'
      }).then((result) => {
        console.log(result);
        if (result.isConfirmed) {

        }
      });
    }
  }

  obtenerUltimoHistorico(requisito: any) {
    // console.log(requisito.id);

    let documentoCreado = this.listaDocumentosCreados.find((documento: any) => {
      return documento.tipoDocumentoAcreditacionId == requisito.id;
    });

    if (!documentoCreado) return null;

    console.log(documentoCreado);
    let lastHistorico = documentoCreado.listHistoricosAcreditacionEmpresaTipoDocumentoAcreditacion.sort((a: any, b: any) => {
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
