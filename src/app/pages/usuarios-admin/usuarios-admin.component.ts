import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TipoRol, Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.scss']
})
export class UsuariosAdminComponent implements OnInit {
  nuevoUsuarioForm: FormGroup;
  listaTipoRol: TipoRol[] = [];
  listaEmpresas: Empresa[] = [];
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['rut', 'nombre', 'apellido1', 'apellido2', 'email', 'telefono', 'activo', 'tiporol', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoadingNew: boolean = false;
  constructor(public utilService: UtilService, public formBuilder: FormBuilder, public _snackBar: MatSnackBar, public api: ApiService, public authService: AuthService) {
    this.nuevoUsuarioForm = this.createNuevoUsuarioForm();
  }

  createNuevoUsuarioForm(): FormGroup {
    return this.formBuilder.group({
      nombre: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      apellido1: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      apellido2: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      rut: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          TPCValidations.isRutInvalido,
        ])
      ),
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
      // usuarioid: new FormControl(
      //   null,
      //   Validators.compose([
      //     Validators.required,
      //   ])
      // ),
      tiporolid: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
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

  ngOnInit(): void {
    this.obtenerUsuarios();
    this.obtenerListaRoles();
    this.obtenerListaEmpresas();
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

  obtenerUsuarios() {
    this.api.getUsuarios().toPromise().then((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.dataSource = new MatTableDataSource(usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  crearUsuario() {

    console.log(this.nuevoUsuarioForm.value)
    this.isLoadingNew = true;
    this.api.crearUsuario(this.nuevoUsuarioForm.value).toPromise().then((usuario: Usuario) => {
      this.isLoadingNew = false;
      this.obtenerUsuarios();
      Swal.fire({
        icon: 'success',
        title: 'Usuario Creado!',
        text: "Se le enviara un correo con usuario y contraseña al nuevo usuario",
      });
      this.nuevoUsuarioForm.reset();
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error,
      });
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cambiarEstadoUsuario(usuario: Usuario) {
    const text = usuario.activo ? "¿Esta seguro de desactivar este usuario?" : "¿Esta seguro de activar este usuario?";
    let auxUser = { ...usuario };
    auxUser.activo = !usuario.activo;
    Swal.fire({
      title: '¿Esta seguro?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiar estado!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.PUT("/usuarios/" + usuario.id, auxUser)
          .then((usuario: Usuario) => {
            Swal.fire(
              'Cambiado!',
              'El estado del usuario ha sido cambiado.',
              'success'
            );
            this.obtenerUsuarios();
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Ha ocurrido un error',
            });
          });
      }
    });
  }

}