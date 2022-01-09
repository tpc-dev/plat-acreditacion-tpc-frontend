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
  
  dataSource!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['rut', 'nombre', 'apellido1', 'apellido2', 'email', 'telefono', 'activo', 'tiporol', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoadingNew: boolean = false;
  constructor(public utilService: UtilService, public formBuilder: FormBuilder, public _snackBar: MatSnackBar, public api: ApiService, public authService: AuthService) {
  }

  

  ngOnInit(): void {
    this.obtenerUsuarios();
   
  }

  obtenerUsuarios() {
    this.api.getUsuarios().toPromise().then((usuarios: Usuario[]) => {
      console.log(usuarios);
      this.dataSource = new MatTableDataSource(usuarios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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