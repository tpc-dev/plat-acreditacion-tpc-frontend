import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoRol, Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-micuenta-page',
  templateUrl: './micuenta-page.component.html',
  styleUrls: ['./micuenta-page.component.scss']
})
export class MicuentaPageComponent implements OnInit {
  usuarioForm!: FormGroup;
  listaTipoRol: TipoRol[] = [];
  listaEmpresas: Empresa[] = [];
  constructor(public authService: AuthService, public formBuilder: FormBuilder, public utilService: UtilService, public api: ApiService) {
    console.log(this.authService.getCuentaActivaValue());
  }

  ngOnInit(): void {
    this.usuarioForm = this.createNuevoUsuarioForm(this.authService.getCuentaActivaValue().usuario);
    this.obtenerListaEmpresas();
    this.obtenerListaRoles();
  }

  obtenerListaEmpresas() {
    this.api.GET("/empresas").then((empresas: Empresa[]) => {
      this.listaEmpresas = empresas;
    }).catch(error => {
      console.log(error);
    });
  }

  obtenerListaRoles() {
    this.api.getRoles().toPromise().then((roles: TipoRol[]) => {
      console.log(roles);
      this.listaTipoRol = roles;
    });
  }

  createNuevoUsuarioForm(usuario: Usuario): FormGroup {
    const { nombre, apellido1, apellido2, rut, email, telefono, tipoRolId, empresaId, activo } = usuario;
    return this.formBuilder.group({
      nombre: new FormControl(
        nombre,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      apellido1: new FormControl(
        apellido1,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      apellido2: new FormControl(
        apellido2,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      rut: new FormControl(
        rut,
        Validators.compose([
          Validators.required,
        ])
      ),
      email: new FormControl(
        email,
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ),
      telefono: new FormControl(
        telefono,
        Validators.compose([
          Validators.required,
        ])
      ),
      tipoRolId: new FormControl(
        tipoRolId,
        Validators.compose([
          Validators.required,
        ])
      ),
      empresaId: new FormControl(
        empresaId,
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

}
