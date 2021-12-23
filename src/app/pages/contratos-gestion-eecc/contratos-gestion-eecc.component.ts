import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-contratos-gestion-eecc',
  templateUrl: './contratos-gestion-eecc.component.html',
  styleUrls: ['./contratos-gestion-eecc.component.scss']
})
export class ContratosGestionEeccComponent implements OnInit {

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
    this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/empresas-contratadas`]);
    // this.router.navigate([`contratos-gestion-eecc/:id/empresas-contratadas`]);
  }

  verTrabajadores() {
    this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/trabajadores`]);
  }

  verCargos() {
    this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/cargos`]);

  }

  verTurnos() {
    this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/turnos`]);

  }

  verVehiculos() {
    this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/vehiculos`]);

  }

  verEventos(){
    
  }

}
