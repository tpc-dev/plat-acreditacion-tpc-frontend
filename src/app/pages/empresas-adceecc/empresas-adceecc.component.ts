import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-empresas-adceecc',
  templateUrl: './empresas-adceecc.component.html',
  styleUrls: ['./empresas-adceecc.component.scss']
})
export class EmpresasAdceeccComponent implements OnInit {

  usuario: Usuario;
  listContratos: any[] = [];
  listEmpresasParaAcreditar: any[] = [];
  isLoading = false;
  constructor(public api: ApiService, public auth: AuthService) {
    this.usuario = this.auth.getCuentaActivaValue().usuario;
  }

  ngOnInit(): void {
    this.obtenerContratosUsuario();
  }

  obtenerContratosUsuario() {
    this.isLoading = true;
    this.api.GET(`/usuarios/${this.usuario.id}/contratos`)
      .then((res: any) => {
        console.log(res);
        this.listContratos = res;
        let promiseAll: Promise<any>[] = [];
        res.forEach((contratousuario: any) => {
          promiseAll.push(this.api.GET(`/contratos/${contratousuario.contratoId}/empresas`));
        });
        return Promise.all(promiseAll);
      })
      .then((res: any[]) => {
        // console.log(res);
        res.forEach((listaEmpresas: any) => {
          this.listEmpresasParaAcreditar = this.listEmpresasParaAcreditar.concat(listaEmpresas);
        });
        console.log(this.listEmpresasParaAcreditar);
        this.isLoading = false;
      })
      .catch((err) => {
        this.isLoading = false;
        console.log(err);

      });
  }

  // Buscar contratos asignados a este usuario, a partir del contrato traer los registro de contratoempresa y desde ahi traer
  // los registros del historico de acreditacion de la empresa para este contrato en especifico


}
