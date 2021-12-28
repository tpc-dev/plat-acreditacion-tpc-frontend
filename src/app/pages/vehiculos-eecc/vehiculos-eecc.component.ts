import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
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
  constructor(public api: ApiService, public activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });
  }

  ngOnInit(): void {
    this.obtenerListadoVehiculos();
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
