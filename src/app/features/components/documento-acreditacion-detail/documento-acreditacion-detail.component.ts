import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { SharepointapiService } from 'src/app/core/services/sharepointapi/sharepointapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documento-acreditacion-detail',
  templateUrl: './documento-acreditacion-detail.component.html',
  styleUrls: ['./documento-acreditacion-detail.component.scss']
})
export class DocumentoAcreditacionDetailComponent implements OnInit {

  isLoading: boolean = false;
  listHistoricoAcreditacion: any[] = [];
  usuario: Usuario;
  tipoRolId: number;
  nombreFile: string;
  newFile: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService, public auth: AuthService, public sharePointApi: SharepointapiService) {
    console.log(this.data);
    this.usuario = this.auth.getCuentaActivaValue().usuario;
    this.tipoRolId = this.usuario.tipoRolId;
    let aux = data.urlFile.split("/");
    this.nombreFile = aux[aux.length - 1];
  }

  ngOnInit(): void {
    this.generateTokenSharePoint();
    this.obtenerHistoricoAcreditacion();
  }

  async fileInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
    this.newFile = fileInputEvent.target.files[0];
    this.nombreFile = this.newFile.name;
  }

  generateTokenSharePoint() {
    this.api.GET('/cuentas/Sharepoint')
      .then(data => {
        // console.log(data);
        this.sharePointApi.setToken(data.access_token);
        // this.sharePointApi.createFolder(this.contratoCodigo);
      })
      .catch(err => {
        console.log(err);
      });
  }

  obtenerHistoricoAcreditacion() {
    this.isLoading = true;

    const url = this.getUrlHistoricoAcreditacion(this.data.tipoDocumentoAcreditacion.documentoClasificacion.id);

    this.api.GET(url)
      .then(data => {
        console.log(data);
        this.listHistoricoAcreditacion = data;
        this.isLoading = false;
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al obtener el historial de acreditaciones',
          icon: 'error'
        });
        console.log(err);
        this.isLoading = false;
      });
  }

  descargarFile() {
    this.sharePointApi.getFile(this.data.urlFile).toPromise()
      .then(data => {
        // console.log(data);
        let blob = new Blob([data], { type: 'application/pdf' });
        let url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al descargar el archivo',
          icon: 'error'
        });
      });
  }

  editarDocumento() {
    // cambiar estado acreditacion documento
    // actulizar urlFile en DocumentoContrato
    this.uploadFile();
  }

  uploadFile() {
    const urlEdit = this.getUrlAPI(this.data.tipoDocumentoAcreditacion.documentoClasificacionId);
    let getFile = this.getFileBuffer(this.newFile);
    getFile.done((arrayBuffer) => {
      this.isLoading = true;
      let req = this.getRequestStructure(this.data.tipoDocumentoAcreditacion.documentoClasificacionId);
      let aux = this.data.urlFile.split("/");
      let nombreFile = aux[aux.length - 1];
      this.sharePointApi.deleteFile(this.data.contrato.codigoContrato, this.data.urlFile, nombreFile).toPromise()
        .then(data => {
          console.log(data);
          return this.sharePointApi.createFile(arrayBuffer, this.data.contrato.codigoContrato, this.newFile.name).toPromise()
        })
        .then((data: any) => {
          console.log(data);
          req.urlfile = data.d.ServerRelativeUrl;
          return this.api.PUT(urlEdit, req);
        })
        .then(data => {
          console.log(data);
          this.dialogRef.close(true);
        })
        .catch(err => {
          this.isLoading = false;
          console.log(err);
        });
    });
  }

  getFileBuffer(fileInput: any) {
    var deferred = jQuery.Deferred();
    var reader = new FileReader();
    reader.onloadend = (e: any) => {
      deferred.resolve(e.target.result);
    }
    reader.onerror = (e: any) => {
      deferred.reject(e.target.error);
    }
    // reader.readAsArrayBuffer(fileInput[0].files[0]);
    reader.readAsArrayBuffer(fileInput);
    return deferred.promise();
  }

  getRequestStructure(documentoClasificacionId: number): any {
    switch (documentoClasificacionId) {
      case 1:
        return {
          fechaInicio: this.data.fechaInicio,
          fechaTermino: this.data.fechaTermino,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.tipoDocumentoAcreditacionId,
          urlfile: this.newFile.name,
          contratoId: this.data.contratoId
        };
      case 2:
        return {
          fechaInicio: this.data.fechaInicio,
          fechaTermino: this.data.fechaTermino,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.tipoDocumentoAcreditacionId,
          urlfile: this.newFile.name,
        };
      case 3:
        return {
          fechaInicio: this.data.fechaInicio,
          fechaTermino: this.data.fechaTermino,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.tipoDocumentoAcreditacionId,
          urlfile: this.newFile.name,
        };
      case 4:
        break;
      case 5:
        return {
          fechaInicio: this.data.fechaInicio,
          fechaTermino: this.data.fechaTermino,
          EstadoAcreditacionId: 2,
          TipoDocumentoAcreditacionId: this.data.tipoDocumentoAcreditacionId,
          urlfile: this.newFile.name,
          contratoId: this.data.contratoId
        };;
    }
  }

  getUrlAPI(documentoClasificacionId: number): string {
    switch (documentoClasificacionId) {
      case 1:
        return `/contratos/${this.data.contratoId}/documento`;
      case 2:
        return `/contratos/${this.data.contratoId}/empresas/documento`;
      case 3:
        return `/contratos/${this.data.contratoId}/trabajador/documento`;
      case 4:
        break;
      case 5:
        return `/contratos/${this.data.contratoId}/vehiculo/documento`;
    }
    return '';
  }

  rechazarDocumento() {
    Swal.fire({
      title: 'Rechazar documento',
      text: '¿Está seguro de rechazar el documento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, rechazar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        let req = {
          EstadoAcreditacionId: 3, // rechazado
          ContratoTipoDocumentoAcreditacionId: this.data.id,
        }

        const url = this.getUrlCambioAcreditacion(this.data.tipoDocumentoAcreditacion.documentoClasificacion.id);

        this.api.PUT(url, req)
          .then(data => {
            Swal.fire({
              title: 'Rechazado',
              text: 'El documento ha sido rechazado',
              icon: 'success'
            });
            this.obtenerHistoricoAcreditacion();
            this.dialogRef.close();
          })
          .catch(err => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al rechazar el documento',
              icon: 'error'
            });
            console.log(err);
          });
      }
    });
  }

  validarDocumento() {
    Swal.fire({
      title: 'Validar documento',
      text: '¿Está seguro de validar el documento?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, validar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        let req = {
          EstadoAcreditacionId: 1, // rechazado
          ContratoTipoDocumentoAcreditacionId: this.data.id,
        }

        const url = this.getUrlCambioAcreditacion(this.data.tipoDocumentoAcreditacion.documentoClasificacion.id);

        this.api.PUT(url, req)
          .then(data => {
            Swal.fire({
              title: 'Validado',
              text: 'El documento ha sido acreditado',
              icon: 'success'
            });
            this.obtenerHistoricoAcreditacion();
          })
          .catch(err => {
            Swal.fire({
              title: 'Error',
              text: 'Ocurrió un error al acreditar el documento',
              icon: 'error'
            });
            console.log(err);
          });
      }
    });
  }

  getUrlCambioAcreditacion(idDocumentoClasificacion: number) {
    // 
    switch (idDocumentoClasificacion) {
      case 1:
        return `/contratos/documento/${this.data.id}/estado-acreditacion`;
      case 2:
        return `/contratos/documento/${this.data.id}/empresa/estado-acreditacion`;
      case 3:
        return `/contratos/documento/${this.data.id}/trabajador/estado-acreditacion`;
      case 4:
        break;
      case 5:
        return `/contratos/documento/${this.data.id}/vehiculo/estado-acreditacion`;
    }
    return '';
  }

  getUrlHistoricoAcreditacion(idDocumentoClasificacion: number) {
    // 
    switch (idDocumentoClasificacion) {
      case 1:
        return `/historico-acreditacion-contrato-documento/${this.data.id}/historico`;
      case 2:
        return `/historico-acreditacion-empresa-documento/${this.data.id}/historico`;
      case 3:
        return `/historico-acreditacion-trabajador-documento/${this.data.id}/historico`;
      case 4:
        break;
      case 5:
        return `/historico-acreditacion-vehiculo-documento/${this.data.id}/historico`;
    }
    return '';
  }
}
