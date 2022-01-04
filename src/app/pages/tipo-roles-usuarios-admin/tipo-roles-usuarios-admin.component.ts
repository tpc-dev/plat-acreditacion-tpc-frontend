import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-tipo-roles-usuarios-admin',
  templateUrl: './tipo-roles-usuarios-admin.component.html',
  styleUrls: ['./tipo-roles-usuarios-admin.component.scss']
})
export class TipoRolesUsuariosAdminComponent implements OnInit {

  listaTiposRoles = [];
  isLoading = false;
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.obtenerTiposRoles();
  }

  obtenerTiposRoles() {
    this.isLoading = true;
    this.api.GET('/tipo-roles')
      .then(res => {
        this.isLoading = false;
        this.listaTiposRoles = res;
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
      });
  }

}
