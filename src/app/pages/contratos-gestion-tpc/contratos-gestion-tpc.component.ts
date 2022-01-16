import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';

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

}
