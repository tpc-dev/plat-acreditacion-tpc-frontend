import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contratos-gestion-tpc',
  templateUrl: './contratos-gestion-tpc.component.html',
  styleUrls: ['./contratos-gestion-tpc.component.scss']
})
export class ContratosGestionTpcComponent implements OnInit {

  contratoId: number;
  constructor(public api: ApiService, public activeRoute: ActivatedRoute, public router: Router) {
    this.activeRoute.params.subscribe(params => {
      this.contratoId = params.id;
      console.log(this.contratoId);
    });
  }

  ngOnInit(): void {
  }

  verEmpresas() {
    // obtener EMPRESACONTRATOREFERENCIA 
    this.router.navigate([`/contratos-gestion-tpc/${this.contratoId}/empresas-contratadas`]);
    // this.router.navigate([`contratos-gestion-tpc/:id/empresas-contratadas`]);
  }

  verTrabajadores() {
    this.router.navigate([`/contratos-gestion-tpc/${this.contratoId}/trabajadores`]);
  }

  verCargos() {
    this.router.navigate([`/contratos-gestion-tpc/${this.contratoId}/cargos`]);
  }

  verTurnos() {
    this.router.navigate([`/contratos-gestion-tpc/${this.contratoId}/turnos`]);
  }

  verVehiculos() {
    this.router.navigate([`/contratos-gestion-tpc/${this.contratoId}/vehiculos`]);
  }

  verContrato() {
    this.router.navigate([`/contratos-gestion-tpc/${this.contratoId}/contrato/requisitos`]);
  }

  verEventos() {
    this.router.navigate([`/contratos-gestion-tpc/${this.contratoId}/eventos`]);
  }

  acreditar() {
    // let documentosPendientes = this.listaDocumentosCreados.filter((documento: any) => {
    //   return documento.estadoAcreditacionId != 1;
    // });

    // console.log(this.listaDocumentosCreados.length)
    // console.log(this.listaRequisitos.length)

    // console.log(documentosPendientes);

    // if (this.listaDocumentosCreados.length < this.listaRequisitos.length || documentosPendientes.length > 0) {
    //   Swal.fire({
    //     title: '¿Está seguro de acreditar el contrato?',
    //     text: 'Tienes documentos que no han sido acreditados. Una vez acreditado, no podrá realizar cambios',
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Si, acreditar contrato'
    //   }).then((result) => {
    //     console.log(result);
    //     if (result.isConfirmed) {

    //     }
    //   });
    // }
  }

  acreditarContrato() {
    Swal.fire({
      title: '¿Está seguro de acreditar el contrato?',
      text: 'Una vez se acredite el contrato los trabajadores y vehiculos asociados a este contrato tendran accesso a las instalaciones de la empresa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, acreditar contrato'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.POST(`/contratos/${this.contratoId}/acreditar`, {})
          .then(res => {
            Swal.fire(
              'Acreditado',
              'El contrato ha sido acreditado',
              'success'
            );
          })
          .catch(err => {
            Swal.fire(
              'Error',
              'El contrato no ha sido acreditado',
              'error'
            );
          });
      }
    });
  }

}
