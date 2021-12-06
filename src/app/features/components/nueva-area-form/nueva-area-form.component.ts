import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-area-form',
  templateUrl: './nueva-area-form.component.html',
  styleUrls: ['./nueva-area-form.component.scss']
})
export class NuevaAreaFormComponent implements OnInit {

  nuevaAreaForm!: FormGroup;
  isLoadingNew = false;
  @Output() onNuevaAreaAgregada = new EventEmitter();
  usuarioId!: number | undefined;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.nuevaAreaForm = this.createNuevaAreaForm();
  }

  obtenerEstadosAcreditacion() {

  }

  createNuevaAreaForm() {
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
      nombre: this.nuevaAreaForm.value.nombre,
      activo: this.nuevaAreaForm.value.activo == "true" ? true : false,
    }
    this.api.POST('/areas', req)
      .then(res => {
        this.onNuevaAreaAgregada.emit(res);
        Swal.fire({
          title: 'Area creada',
          text: 'La área ha sido creada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.nuevaAreaForm.reset();
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
