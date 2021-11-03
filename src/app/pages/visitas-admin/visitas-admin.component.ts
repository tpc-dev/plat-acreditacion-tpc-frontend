import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { Cuenta, Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';

@Component({
  selector: 'app-visitas-admin',
  templateUrl: './visitas-admin.component.html',
  styleUrls: ['./visitas-admin.component.scss']
})
export class VisitasAdminComponent implements OnInit {
  nuevaVisitaForm: FormGroup;
  minDate: Date;
  listaEncargados: Array<Usuario> = [];

  // 

  displayedColumns: string[] = ['rut', 'nombre', 'apellido', 'area', 'encargado', 'fechavisita', 'comentario', 'acciones'];
  dataSource!: MatTableDataSource<Visita>;
  cuenta!: Cuenta;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public utilService: UtilService, public formBuilder: FormBuilder, public _snackBar: MatSnackBar, public api: ApiService, public authService: AuthService) {
    this.nuevaVisitaForm = this.createNuevaVisitaForm();
    const now = moment().format('L');
    console.log(now);
    this.minDate = moment().toDate();
    this.authService.getCuentaActiva().subscribe((cuenta: Cuenta) => {
      this.cuenta = cuenta;
      this.obtenerMisVisitas();
    })
  }

  obtenerMisVisitas() {
    this.api.obtenerVisitasPorEncargado(this.cuenta.usuario.id).toPromise()
      .then((res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((error) => {
        console.log(error)
      });

  }

  ngOnInit(): void {
    this.obtenerEncargados();
  }

  createNuevaVisitaForm() {
    return this.formBuilder.group({
      nombre: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      apellido: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      rut: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      area: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      // usuarioid: new FormControl(
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //   ])
      // ),
      fechavisita: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
      comentario: new FormControl(
        '',
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

  obtenerEncargados(): void {
    this.api.getUsuarioPorRol(2).subscribe(res => {
      console.log(res)
      this.listaEncargados = res;
    }, error => {
      console.log(error)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agendarVisita(): void {
    this.nuevaVisitaForm.markAllAsTouched();
    console.log('agendarVisita')
    if (this.nuevaVisitaForm.invalid) return;
    console.log(this.nuevaVisitaForm.value)
    if (!this.utilService.validateRut(this.nuevaVisitaForm.value.rut)) {
      this.openSnackBar('Rut no valido', 2000);
      return;
    }
    let nuevaVisita = this.nuevaVisitaForm.value;
    nuevaVisita.usuarioid = this.cuenta.usuario.id;
    this.api.agendarVisita(nuevaVisita).subscribe(res => {
      console.log(res)
      this.obtenerMisVisitas();
    }, error => {
      console.log(error);
    });

  }

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, '', { duration: duration });
  }


}
