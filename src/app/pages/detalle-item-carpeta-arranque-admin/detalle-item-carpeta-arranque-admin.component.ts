import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ItemCarpetaArranque } from 'src/app/core/interfaces/itemcarpetaarranque.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { DetailTipoDocAcreditacionComponent } from 'src/app/features/components/detail-tipo-doc-acreditacion/detail-tipo-doc-acreditacion.component';
import { VisitaIngresosHistoricoComponent } from 'src/app/features/components/visita-ingresos-historico/visita-ingresos-historico.component';

@Component({
  selector: 'app-detalle-item-carpeta-arranque-admin',
  templateUrl: './detalle-item-carpeta-arranque-admin.component.html',
  styleUrls: ['./detalle-item-carpeta-arranque-admin.component.scss']
})
export class DetalleItemCarpetaArranqueAdminComponent implements OnInit {

  idElemento: number;
  tiposDocumentos: any[] = [];
  isLoading: boolean = false;
  listaClasificacionDocumento: any[] = [];
  nombreItemCarpetaArranque :string = "";
  constructor(public activeRoute: ActivatedRoute, public apiService: ApiService, public dialog: MatDialog) {
    console.log("asdasdasd");
    this.obtenerClasificacionDocumento();
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.idElemento = params.id;
      this.obtenerItemCarpetaArranque(this.idElemento);
      this.obtenerTipoDocumentosPorId(params.id);
    });

  }

  obtenerItemCarpetaArranque(id: number) {
    this.isLoading = true;
    this.apiService.GET(`/item-carpeta-arranque/${id}`)
      .then((data:ItemCarpetaArranque) => {
        console.log(data);
        this.nombreItemCarpetaArranque = data.description; 
        this.isLoading = false;
      })
      .catch(error => {
        console.log(error);
        this.isLoading = false;
      });
  }

  obtenerClasificacionDocumento() {
    this.apiService.GET('/documentos-acreditacion/activos')
      .then(data => {
        this.listaClasificacionDocumento = data;
      }).catch(error => {
        console.log(error);
      });
  }


  ngOnInit(): void {
    console.log("asdasdasd");
  }

  obtenerTipoDocumentosPorId(id: number) {
    this.isLoading = true;
    this.apiService.GET(`/tipo-documento-acreditacion/item-carpeta-arranque/${id}`)
      .then(data => {
        console.log(data);
        this.tiposDocumentos = data;
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  newTipoDoc() {
    const dialogRef = this.dialog.open(DetailTipoDocAcreditacionComponent, {
      width: '650px',
      data: { listaClasificacionDocumento: this.listaClasificacionDocumento, isEdit: false, idItemCarpetaArranque: this.idElemento }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      this.obtenerTipoDocumentosPorId(this.idElemento);
      // if (!result) return;
      // this.api.editarVisita(result).subscribe(res => {
      //   console.log(res)
      //   Swal.fire({
      //     title: 'Datos Actualizados',
      //     icon: 'warning',
      //     confirmButtonColor: '#3085d6',
      //     confirmButtonText: 'Aceptar'
      //   })
      //   this.recargarVisitas();
      // }, (error: any) => {
      //   console.log(error);
      //   Swal.fire(
      //     'Ha ocurrido un error!',
      //     'No se pudo modificar la visita, intentalo nuevamente.',
      //     'error'
      //   )
      // });
    });
  }

  editTipoDoc(documento: any) {
    console.log(documento);
    const dialogRef = this.dialog.open(DetailTipoDocAcreditacionComponent, {
      width: '650px',
      data: { ...documento, isEdit: true }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      // if (!result) return;
      // this.api.editarVisita(result).subscribe(res => {
      //   console.log(res)
      //   Swal.fire({
      //     title: 'Datos Actualizados',
      //     icon: 'warning',
      //     confirmButtonColor: '#3085d6',
      //     confirmButtonText: 'Aceptar'
      //   })
      //   this.recargarVisitas();
      // }, (error: any) => {
      //   console.log(error);
      //   Swal.fire(
      //     'Ha ocurrido un error!',
      //     'No se pudo modificar la visita, intentalo nuevamente.',
      //     'error'
      //   )
      // });
    });
  }

  goBack() {
    window.history.back();
  }
}
