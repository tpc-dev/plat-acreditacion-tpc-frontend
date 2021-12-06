import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-empresa-form',
  templateUrl: './nueva-empresa-form.component.html',
  styleUrls: ['./nueva-empresa-form.component.scss']
})
export class NuevaEmpresaFormComponent implements OnInit {
  nuevaEmpresaForm!: FormGroup;
  isLoadingNew = false;
  @Output() onNuevaEmpresaAgregada = new EventEmitter();
  usuarioId!: number | undefined;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.nuevaEmpresaForm = this.createNuevaEmpresaForm();
  }

  obtenerEstadosAcreditacion() {

  }

  createNuevaEmpresaForm() {
    return this.formBuilder.group({
      rut: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          TPCValidations.isRutInvalido
        ])
      ),
      razonsocial: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      estadoacreditacionid: new FormControl(
        1,
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

  crearEmpresa() {
    this.isLoadingNew = true;
    let req = {
      rut: this.nuevaEmpresaForm.value.rut.trim(),
      razonSocial: this.nuevaEmpresaForm.value.razonsocial,
      estadoAcreditacionId: 1,
      activo: true
    }
    this.api.POST('/empresas', req)
      .then(res => {
        this.onNuevaEmpresaAgregada.emit(res);
        Swal.fire({
          title: 'Empresa creada',
          text: 'La empresa ha sido creada con éxito',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.nuevaEmpresaForm.reset();
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: `No se pudo crear la empresa. ${err.error}`,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      })
      .finally(() => {
        this.isLoadingNew = false;
      });
  }
}
