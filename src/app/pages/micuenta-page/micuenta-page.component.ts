import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoRol, Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-micuenta-page',
  templateUrl: './micuenta-page.component.html',
  styleUrls: ['./micuenta-page.component.scss']
})
export class MicuentaPageComponent implements OnInit {
  usuarioForm!: FormGroup;
  listaTipoRol: TipoRol[] = [];
  listaEmpresas: Empresa[] = [];
  usuario: Usuario;
  empresa: string | undefined;
  tipoRol: string;
  constructor(public authService: AuthService, public formBuilder: FormBuilder, public utilService: UtilService, public api: ApiService) {
    console.log(this.authService.getCuentaActivaValue());
    this.usuario = this.authService.getCuentaActivaValue().usuario;
    this.empresa = this.usuario.empresa?.razonSocial;
    this.tipoRol = this.usuario.tipoRol.nombre;
    console.log(this.usuario.empresaId);

  }

  public changeListener(event:any) {
    let files = event.target['files'];
    if (files && files.length > 0) {
      let file: any = files.item(0);
      console.log(file?.name);
      console.log(file?.size);
      console.log(file?.type);
      let reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        console.log(reader.result);
        
        let csv: string = reader.result as string;
        console.log(csv);
      }
    }
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
    const { nombre, apellido1, apellido2, rut, email, telefono, tipoRol, empresaId, empresa, activo } = usuario;
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
          TPCValidations.isRutInvalido,
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
    });
  }

  guardarDatos() {

    let req = {
      Id: this.usuario.id,
      Nombre: this.usuarioForm.get('nombre')?.value,
      Apellido1: this.usuarioForm.get('apellido1')?.value,
      Apellido2: this.usuarioForm.get('apellido2')?.value,
      Telefono: this.usuarioForm.get('telefono')?.value,
    }

    this.api.PUT(`/usuarios/usuarioplataforma/${this.usuario.id}`, req)
      .then((res) => {
        Swal.fire({
          title: 'Datos actualizados',
          text: 'Los datos se actualizaron correctamente',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.authService.setCuentaSessionStorage(res);
        this.authService.setCuentaActiva(res);
      })
      .catch(error => {
        Swal.fire({
          title: 'Error',
          text: "No se pudo actualizar los cambios",
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });
  }

}
