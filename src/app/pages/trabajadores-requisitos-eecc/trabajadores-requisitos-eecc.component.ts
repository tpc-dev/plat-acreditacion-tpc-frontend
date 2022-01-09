import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDatepickerInput } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { DocumentoAcreditacionDetailComponent } from 'src/app/features/components/documento-acreditacion-detail/documento-acreditacion-detail.component';
import { UploadTipoDocumentoComponent } from 'src/app/features/components/upload-tipo-documento/upload-tipo-documento.component';

@Component({
  selector: 'app-trabajadores-requisitos-eecc',
  templateUrl: './trabajadores-requisitos-eecc.component.html',
  styleUrls: ['./trabajadores-requisitos-eecc.component.scss']
})
export class TrabajadoresRequisitosEeccComponent implements OnInit {
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
  constructor(public api: ApiService, public router: Router, public activeRoute: ActivatedRoute, public dialog: MatDialog) {
    this.data = this.router.getCurrentNavigation()?.extras.state?.data;
    console.log(this.router.getCurrentNavigation()?.extras.state);
    if (!this.data) {
      this.router.navigate(['../'], { relativeTo: this.activeRoute });
    }

    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.contratoId = params.id;
    });
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
        this.listaRequisitos = this.listDocumentosRequeridos.filter((requisito: any) => requisito.documentoClasificacionId == 3);
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

  openUploadDialog(requisito: any) {
    const dialogRef = this.dialog.open(UploadTipoDocumentoComponent, {
      width: '850px',
      height: '380px',
      data: { ...requisito, contratoId: this.contratoId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      // this.loadData();
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
      data: { ...documentoCreado, contratoId: this.contratoId }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      // this.loadData();
    });
  }

}
