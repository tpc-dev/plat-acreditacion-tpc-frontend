import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-eecc',
  templateUrl: './vehiculos-eecc.component.html',
  styleUrls: ['./vehiculos-eecc.component.scss']
})
export class VehiculosEeccComponent implements OnInit {

  isLoading: boolean = false;
  listaVehiculos: any[] = []
  contratoId: number;
  tipoRolId: number;
  estadoAcreditacionId: number;
  constructor(public api: ApiService, public activeRoute: ActivatedRoute, public auth:AuthService) {
    this.tipoRolId = auth.getCuentaActivaValue().usuario.tipoRolId;
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });
  }

  ngOnInit(): void {
    this.obtenerContratoDetail();
    this.obtenerListadoVehiculos();
  }

  obtenerContratoDetail() {
    this.api.GET(`/contratos/${this.contratoId}`)
      .then((data: any) => {
        console.log(data);
        this.estadoAcreditacionId = data.estadoAcreditacionId;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  obtenerListadoVehiculos() {
    this.isLoading = true;
    this.api.GET(`/contratos/${this.contratoId}/vehiculos`)
      .then(res => {
        this.isLoading = false;
        this.listaVehiculos = res;
        console.log(res);
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los vehículos del contrato',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

}
