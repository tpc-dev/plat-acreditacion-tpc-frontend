import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-nombrada-form',
  templateUrl: './nueva-nombrada-form.component.html',
  styleUrls: ['./nueva-nombrada-form.component.scss']
})
export class NuevaNombradaFormComponent implements OnInit {
  @Input() listaTrabajadores: any[] = [];
  nuevaNombradaForm: FormGroup;
  fechaHoy = new Date();
  usuario: Usuario;
  isSaving = false;
  constructor(public auth: AuthService, public api: ApiService, public formBuilder: FormBuilder) {
    this.usuario = this.auth.getCuentaActivaValue().usuario;
  }

  ngOnInit(): void {
    this.nuevaNombradaForm = this.createForm();
  }

  createForm() {
    return this.formBuilder.group({
      Fecha: [this.fechaHoy, Validators.required],
      HoraInicio: ['', Validators.required],
      HoraTermino: ['', Validators.required],
    });
  }

  guardarNombrada() {
    const listaIdTrabajadores = this.listaTrabajadores.map(trabajador => trabajador.id);

    let req = {
      Fecha: this.nuevaNombradaForm.value.Fecha,
      HoraInicio: this.nuevaNombradaForm.value.HoraInicio,
      HoraTermino: this.nuevaNombradaForm.value.HoraTermino,
      UsuarioId: this.usuario.id
    }

    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Está seguro de guardar la nombrada?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.isSaving = true;
        this.api.POST('/nombrada-diaria', req)
          .then((res: any) => {
            let req = {
              Trabajadores: listaIdTrabajadores,
            }
            return this.api.POST(`/nombrada-diaria/${res.id}/list-trabajador-frecuente`, listaIdTrabajadores)
          })
          .then((res: any) => {
            Swal.fire(
              'Guardado!',
              'La nombrada ha sido guardada.',
              'success'
            );
            this.isSaving = false;
          })
          .catch((err: any) => {
            this.isSaving = false;
            Swal.fire(
              'Error!',
              'Ha ocurrido un error al guardar la nombrada.',
              'error'
            );
          });
      }
    });
  }

}
