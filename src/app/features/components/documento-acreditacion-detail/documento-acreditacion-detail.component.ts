import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
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
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService, public auth: AuthService) {
    console.log(this.data);
    this.usuario = this.auth.getCuentaActivaValue().usuario;
    this.tipoRolId = this.usuario.tipoRolId;
  }

  ngOnInit(): void {
    this.obtenerHistoricoAcreditacion();
  }

  obtenerHistoricoAcreditacion() {
    this.isLoading = true;
    this.api.GET(`/historico-acreditacion-contrato-documento/${this.data.id}/historico`)
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
    // window.open('/assets/images/logo-tpc-transparente.png', '_blank');
    window.open('assets/pdfs/MERv2.pdf', '_blank');
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

        this.api.POST('/historico-acreditacion-contrato-documento', req)
          .then(data => {
            Swal.fire({
              title: 'Rechazado',
              text: 'El documento ha sido rechazado',
              icon: 'success'
            });
            this.obtenerHistoricoAcreditacion();
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

      }
    });
  }

}
