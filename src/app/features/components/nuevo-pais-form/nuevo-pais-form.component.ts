import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-pais-form',
  templateUrl: './nuevo-pais-form.component.html',
  styleUrls: ['./nuevo-pais-form.component.scss']
})
export class NuevoPaisFormComponent implements OnInit {

  nuevoPaisForm!: FormGroup;
  isLoadingNew = false;
  @Output() onNuevoPais = new EventEmitter();
  usuarioId!: number | undefined;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.nuevoPaisForm = this.createNuevoPaisForm();
  }
  createNuevoPaisForm() {
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
      nombre: this.nuevoPaisForm.value.nombre,
      activo: this.nuevoPaisForm.value.activo == "true" ? true : false,
    }
    this.api.POST('/paises', req)
      .then(res => {
        this.onNuevoPais.emit(res);
        Swal.fire({
          title: 'Pais creado',
          text: 'El pais ha sido creada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.nuevoPaisForm.reset();
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: `No se pudo crear el país. ${err.error}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
      .finally(() => {
        this.isLoadingNew = false;
      });
  }

}
