import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajadores-eecc',
  templateUrl: './trabajadores-eecc.component.html',
  styleUrls: ['./trabajadores-eecc.component.scss']
})
export class TrabajadoresEeccComponent implements OnInit {

  contratoId: number;
  listaTrabajadores: any[] = [];
  isLoading: boolean = false;
  constructor(public api: ApiService, public activeRoute: ActivatedRoute) {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });
  }

  ngOnInit(): void {
    this.obtenerTrabajadores();
  }

  obtenerTrabajadores() {
    this.isLoading = true;
    this.api.GET(`/contratos/${this.contratoId}/trabajadores`)
      .then(res => {
        this.isLoading = false;
        this.listaTrabajadores = res;
        console.log(res);
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los trabajadores del contrato',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

}
