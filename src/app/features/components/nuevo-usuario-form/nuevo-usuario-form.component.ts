import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TipoRol, Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-nuevo-usuario-form',
  templateUrl: './nuevo-usuario-form.component.html',
  styleUrls: ['./nuevo-usuario-form.component.scss']
})
export class NuevoUsuarioFormComponent implements OnInit {
  @Output() onNuevoUsuarioCreado = new EventEmitter();
  nuevoUsuarioForm: FormGroup;
  listaTipoRol: TipoRol[] = [];
  listaEmpresas: Empresa[] = [];
  isLoadingNew: boolean = false;
  listTrabajadoresTPC: any[] = [];
  filteredOptions: Observable<any[]> | undefined;

  constructor(public formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.nuevoUsuarioForm = this.createNuevoUsuarioForm();
    this.obtenerListaRoles();
    this.obtenerListaEmpresas();
    this.obtenerTrabajadoresTPC();
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

  createNuevoUsuarioForm(): FormGroup {
    return this.formBuilder.group({
      email: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ),
      telefono: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      tiporolid: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      trabajadorId: new FormControl(
        null,
        Validators.compose([])
      ),
      empresaId: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      activo: new FormControl(
        true,
        Validators.compose([
          Validators.nullValidator,
        ])
      ),
    });
  }

  crearUsuario() {
    this.isLoadingNew = true;
    const trabajador = this.listTrabajadoresTPC.find(trabajador => trabajador.id === this.nuevoUsuarioForm.value.trabajadorId);
    let req = {
      nombre: trabajador.nombres,
      apellido1: trabajador.apellidoPaterno,
      apellido2: trabajador.apellidoMaterno,
      rut: trabajador.rut,
      email: this.nuevoUsuarioForm.value.email,
      telefono: this.nuevoUsuarioForm.value.telefono,
      tiporolid: this.nuevoUsuarioForm.value.tiporolid,
      empresaId: this.nuevoUsuarioForm.value.empresaId,
      activo: this.nuevoUsuarioForm.value.activo,
      TrabajadorTPCId: this.nuevoUsuarioForm.value.trabajadorId,
    };

    console.log(req);
    this.api.crearUsuario(req).toPromise().then((usuario: Usuario) => {
      this.isLoadingNew = false;
      Swal.fire({
        icon: 'success',
        title: 'Usuario Creado!',
        text: "Se le enviara un correo con usuario y contraseña al nuevo usuario",
      });
      this.nuevoUsuarioForm.reset();
      this.onNuevoUsuarioCreado.emit(usuario);
    }, error => {
      this.isLoadingNew = false;
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error,
      });
    });
  }

  obtenerTrabajadoresTPC() {
    this.api.GET(`/trabajadores-tpc`)
      .then(res => {
        this.listTrabajadoresTPC = res;
        this.filteredOptions = this.nuevoUsuarioForm.get('trabajadorId')?.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value)),
        );
        console.log("aaaaaaaaaaa");
      })
      .catch(err => {
        console.log(err);
      })
  }


  private _filter(value: any): string[] {

    if (typeof value === 'string') {
      const filterValue = value.toLowerCase();
      return this.listTrabajadoresTPC.filter(trabajador => {
        return trabajador.nombres.toLowerCase().includes(filterValue) || trabajador.apellidoPaterno.toLowerCase().includes(filterValue)
          || trabajador.apellidoMaterno.toLowerCase().includes(filterValue) || trabajador.rut.toLowerCase().includes(filterValue)
      });
    }
    return this.listTrabajadoresTPC;
  }


  getFormatTrabajador(trabajadorId: string) {
    if (this.listTrabajadoresTPC.length == 0) return '';
    let trabajdor = this.listTrabajadoresTPC.find(trabajador => trabajador.id === trabajadorId)
    if (!trabajdor) return '';
    return `${trabajdor.nombres} ${trabajdor.apellidoPaterno} ${trabajdor.apellidoMaterno}`;
  }
}
