import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['rut', 'razonsocial', 'estado', 'requisitos'];

  contratoId: number;
  constructor(public api: ApiService, public activeRoute: ActivatedRoute, public auth: AuthService, public router: Router) {
    this.usuario = this.auth.getCuentaActivaValue().usuario;
    this.activeRoute.params.subscribe(params => {
      console.log(params);
      this.contratoId = params.id;
    });

  }

  ngOnInit(): void {
    //  this.obtenerContratosUsuario();
    this.obtenerEmpresasParaAcreditar();
  }
  obtenerEmpresasParaAcreditar() {
    console.log("obtenerEmpresasParaAcreditar");
    this.isLoading = true;
    this.api.GET(`/contratos/${this.contratoId}/empresa-contratadas`)
      .then((res: any) => {
        console.log(res);
        this.listEmpresasParaAcreditar.push(res);
        this.dataSource = new MatTableDataSource(this.listEmpresasParaAcreditar);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => {
        console.log(err);
      });
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

  verRequisitos(empresaData: any) {
    console.log(empresaData);

    // this.router.navigate(['item-carpeta-arranque-admin', 3]);
    // this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/empresas-contratadas`]);
    if (this.usuario.tipoRolId == 5)
      this.router.navigate([`/contratos-gestion-eecc/${this.contratoId}/empresas-contratadas/requisitos`], { state: { data: empresaData } });
    else if (this.usuario.tipoRolId == 4)
      this.router.navigate([`/contratos-gestion-tpc/${this.contratoId}/empresas-contratadas/requisitos`], { state: { data: empresaData } });
  }

  // Buscar contratos asignados a este usuario, a partir del contrato traer los registro de contratoempresa y desde ahi traer
  // los registros del historico de acreditacion de la empresa para este contrato en especifico


}
