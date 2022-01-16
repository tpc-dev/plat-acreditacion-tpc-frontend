import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
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
  tipoRolId: number;
  constructor(public auth: AuthService, public api: ApiService, public activeRoute: ActivatedRoute) {
    this.tipoRolId = this.auth.getCuentaActivaValue().usuario.tipoRolId;
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
        this.listaTrabajadores = this.listaTrabajadores.map(x => {
          x.estado = this.setEstado(x.listTrabajadorTiposDocumentoAcreditacion);
          return x;
        });
        console.log(this.listaTrabajadores);
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

  setEstado(listDocumentosTrabajadorContrato: any[]) {
    let estado = listDocumentosTrabajadorContrato.filter(x => x.estado == 'PENDIENTE');
    if (estado.length > 0) {
      return 'PENDIENTE';
    } else {
      return 'COMPLETADO';
    }
  }


}
