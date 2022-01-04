import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { Cuenta } from 'src/app/core/interfaces/cuenta.interface';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-empresas-admin',
  templateUrl: './empresas-admin.component.html',
  styleUrls: ['./empresas-admin.component.scss']
})
export class EmpresasAdminComponent implements OnInit {
  @ViewChild(MatTabGroup) tabs!: MatTabGroup;
  listAcreditadas: Array<Empresa> = [];
  listEnAcreditacion: Array<Empresa> = [];
  listaEmpresas: Array<Empresa> = [];
  isLoading = false;
  isAdministrador: boolean = true;
  cuenta!: Cuenta;
  constructor(public utilService: UtilService, public _snackBar: MatSnackBar,
    public api: ApiService, public authService: AuthService) {

  }

  ngOnInit(): void {
    this.obtenerEmpresas();
    // this.obtenerEmpresasEnAcreditacion();
    // this.obtenerEmpresasAcreditadas();
  }

  obtenerEmpresas(): void {
    this.isLoading = true;
    this.api.GET("/empresas")
      .then((empresas: Empresa[]) => {
        console.log(empresas);
        this.listaEmpresas = empresas;
      })
      .catch(error => {
        console.log(error)
      }).finally(() => {
        console.log('finally')
        this.isLoading = false;
      });
  }

}
