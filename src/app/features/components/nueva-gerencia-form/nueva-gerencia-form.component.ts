import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-gerencia-form',
  templateUrl: './nueva-gerencia-form.component.html',
  styleUrls: ['./nueva-gerencia-form.component.scss']
})
export class NuevaGerenciaFormComponent implements OnInit {

  nuevaGerenciaForm!: FormGroup;
  isLoadingNew = false;
  @Output() onNuevaGerenciaAgregada = new EventEmitter();
  usuarioId!: number | undefined;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.nuevaGerenciaForm = this.createNuevaGerenciaForm();
  }

  obtenerEstadosAcreditacion() {

  }

  createNuevaGerenciaForm() {
    return this.formBuilder.group({
      nombre: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      activo: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      )
    });
  }

  crearArea() {
    this.isLoadingNew = true;
    let req = {
      nombre: this.nuevaGerenciaForm.value.nombre,
      activo: this.nuevaGerenciaForm.value.activo == "true" ? true : false,
    }
    this.api.POST('/gerencias', req)
      .then(res => {
        this.onNuevaGerenciaAgregada.emit(res);
        Swal.fire({
          title: 'Area creada',
          text: 'La área ha sido creada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.nuevaGerenciaForm.reset();
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: `No se pudo crear la área. ${err.error}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
      .finally(() => {
        this.isLoadingNew = false;
      });
  }

}
