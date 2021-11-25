import { Component, OnInit } from '@angular/core';
import { ProtocoloIngreso } from 'src/app/core/interfaces/protocoloingreso.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-platform-settings-admin',
  templateUrl: './platform-settings-admin.component.html',
  styleUrls: ['./platform-settings-admin.component.scss']
})
export class PlatformSettingsAdminComponent implements OnInit {

  lisProtocolos: ProtocoloIngreso[] = [];
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerProtocolos();
  }

  obtenerProtocolos() {
    this.apiService.GET('/protocolos-ingreso')
      .then(data => {
        console.log(data);
        this.lisProtocolos = data;
      })
      .catch(err => {
        console.log(err);
        Swal.fire(
          'Ha ocurrido un error',
          'No se pudo cargar los protocolos.',
          'error'
        )
      });
  }

  updateProtocolo(protocolo: ProtocoloIngreso) {
    console.log(protocolo);
    this.apiService.PUT('/protocolos-ingreso/' + protocolo.id, protocolo)
      .then(data => {
        console.log(data);
        this.obtenerProtocolos();
        Swal.fire(
          'Protocolo Actualizado',
          'Se ha actualizado correctamente.',
          'success'
        )
      })
      .catch(err => {
        Swal.fire(
          'Ha ocurrido un error',
          'No se pudo actualizar el protocolo.',
          'error'
        )
        console.log(err);
      });
  }
}
