import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import * as moment from 'moment';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { VisitaDetailComponent } from 'src/app/features/components/visita-detail/visita-detail/visita-detail.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-visitas-guardia',
  templateUrl: './visitas-guardia.component.html',
  styleUrls: ['./visitas-guardia.component.scss']
})

export class VisitasGuardiaComponent implements AfterViewInit {
  displayedColumns: string[] = ['rut', 'nombre', 'apellido', 'area', 'encargado', 'fechavisita', 'comentario', 'acciones'];
  dataSource!: MatTableDataSource<Visita>;
  dataSourceVisitasHoy!: MatTableDataSource<Visita>;
  dataSourceVisitasIngresadas!: MatTableDataSource<Visita>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTabGroup) tabs!: MatTabGroup;
  listVisitasHoy: Array<Visita> = [];
  listTodasLasVisitas: Array<Visita> = [];
  listVisitasIngresadas: Array<Visita> = [];
  nuevaVisitaForm: FormGroup;
  minDate: Date;
  listaEncargados: Array<Usuario> = [];
  isLoading = false;
  isLoadingNew = false;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService, public dialog: MatDialog) {
    this.nuevaVisitaForm = this.createNuevaVisitaForm();
    const now = moment().format('L');
    this.minDate = moment().toDate();
    this.obtenerVisitasActivas();
    this.obtenerEncargados();
  }

  ngAfterViewInit() {
  }

  obtenerVisitasActivas() {
    this.isLoading = true;
    this.api.obtenerVisitasActivas().toPromise().then((res) => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.listTodasLasVisitas = res;
      this.obtenerVisitasHoy(res);
      this.obtenerVisitasIngresadas(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    }).catch((err: any) => {
      console.log(err);
      this.isLoading = false;
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

  createNuevaVisitaForm() {
    return this.formBuilder.group({
      nombre: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      apellido: new FormControl(
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
        ])
      ),
      area: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      usuarioid: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      fechavisita: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      comentario: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

  obtenerVisitasHoy(listaTodasLasVisitas: Array<Visita>) {
    this.listVisitasHoy = listaTodasLasVisitas.filter((visita: Visita) => {
      const fechaVisita = moment(visita.fechaVisita).format('L');
      const fechaHoy = moment().format('L');
      return fechaVisita == fechaHoy && visita.haIngresado == false;
    });
    console.log(this.listVisitasHoy)
    this.dataSourceVisitasHoy = new MatTableDataSource(this.listVisitasHoy);
  }

  obtenerVisitasIngresadas(listVisitasIngresadas: Array<Visita>) {
    this.listVisitasIngresadas = listVisitasIngresadas.filter((visita: Visita) => {
      return visita.haIngresado == true;
    });
    console.log(this.listVisitasIngresadas)
    this.dataSourceVisitasIngresadas = new MatTableDataSource(this.listVisitasIngresadas);
  }

  applyFilter(event: Event) {
    console.log(this.tabs.selectedIndex)
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.tabs.selectedIndex == 0) {
      this.dataSourceVisitasHoy.filter = filterValue.trim().toLowerCase();

      if (this.dataSourceVisitasHoy.paginator) {
        this.dataSourceVisitasHoy.paginator.firstPage();
      }
    }

    if (this.tabs.selectedIndex == 1) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  agendarVisita(): void {
    this.nuevaVisitaForm.markAllAsTouched();
    console.log('agendarVisita')
    if (this.nuevaVisitaForm.invalid) return;
    console.log(this.nuevaVisitaForm.value)
    this.isLoadingNew = true;
    if (!this.utilService.validateRut(this.nuevaVisitaForm.value.rut)) {
      this.utilService.openSnackBar('Rut no valido', 2000);
      return;
    }
    let nuevaVisita = this.nuevaVisitaForm.value;
    this.api.agendarVisita(nuevaVisita).subscribe(res => {
      console.log(res)
      Swal.fire({
        title: 'Nueva Visita Agendada',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Si'
      })
      this.obtenerVisitasActivas();
      this.isLoadingNew = false;
    }, error => {
      console.log(error);
      this.isLoadingNew = false;
    });
  }

  marcarIngresoVisita(visita: Visita): void {
    console.log(visita)
    Swal.fire({
      title: '¿Desea marcar el ingreso de esta visita?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.marcarIngresoVisita(visita).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Ingreso Registrado!',
            'Se ha marcado el ingreso correctamente.',
            'success'
          )
          this.obtenerVisitasActivas();
        }, error => {
          console.log(error);
          Swal.fire(
            'Ha ocurrido un error!',
            'No se pudo registrar el acceso, intentalo nuevamente.',
            'error'
          )
        });
      }
    })
  }

  cancelarVisita(visita: Visita): void {
    console.log(visita)
    Swal.fire({
      title: '¿Esta seguro que desea eliminar la visita agendada?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.cancelarVisita(visita).subscribe(res => {
          console.log(res)
          Swal.fire(
            'Visita Agendada Eliminada!',
            'Se ha eleminiado  correctamente.',
            'success'
          )
          this.obtenerVisitasActivas();
        }, error => {
          console.log(error);
          Swal.fire(
            'Ha ocurrido un error!',
            'No se pudo eliminar el acceso, intentalo nuevamente.',
            'error'
          )
        });
      }
    })
  }

  editarCamposVisita(visita: Visita): void {
    console.log(visita)
    this.openDialog(visita)
  }

  openDialog(visita: Visita): void {
    const dialogRef = this.dialog.open(VisitaDetailComponent, {
      width: '650px',
      data: { ...visita }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (!result) return;
      this.api.editarVisita(result).subscribe(res => {
        console.log(res)
        Swal.fire({
          title: 'Datos Actualizados',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Si'
        })
        this.obtenerVisitasActivas();
      }, (error: any) => {
        console.log(error);
        Swal.fire(
          'Ha ocurrido un error!',
          'No se pudo modificar la visita, intentalo nuevamente.',
          'error'
        )
      });
    });
  }

}





