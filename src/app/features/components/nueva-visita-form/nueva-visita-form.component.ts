import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Cuenta, Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nueva-visita-form',
  templateUrl: './nueva-visita-form.component.html',
  styleUrls: ['./nueva-visita-form.component.scss']
})
export class NuevaVisitaFormComponent implements OnInit {
  nuevaVisitaForm!: FormGroup;
  isLoadingNew = false;
  minDate: Date;
  @Input() listaEncargados: Array<Usuario> = [];
  @Input() isAdministrador: boolean = false;
  @Output() onNuevaVisitaAdded = new EventEmitter();
  usuarioId!: number | undefined;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService,
    public authService: AuthService) {
    this.minDate = moment().toDate();
  }

  ngOnInit(): void {
    console.log(this.isAdministrador)
    this.usuarioId = this.isAdministrador ? this.authService.getCuentaActivaValue().usuario.id : undefined
    this.nuevaVisitaForm = this.createNuevaVisitaForm();
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
          TPCValidations.isRutInvalido,
        ])
      ),
      area: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      usuarioid: new FormControl(
        this.usuarioId,
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


  agendarVisita(): void {
    this.nuevaVisitaForm.markAllAsTouched();
    console.log(this.nuevaVisitaForm.value)
    console.log(this.authService.getCuentaActivaValue().usuario.id)
    if (this.nuevaVisitaForm.invalid) return;
    console.log(this.nuevaVisitaForm.value)
    this.isLoadingNew = true;
    if (!this.utilService.validateRut(this.nuevaVisitaForm.value.rut)) {
      this.utilService.openSnackBar('Rut no valido', 2000);
      return;
    }
    let nuevaVisita = this.nuevaVisitaForm.value;
    this.api.agendarVisita(nuevaVisita).subscribe(res => {
      Swal.fire({
        title: 'Nueva Visita Agendada',
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar'
      })
      this.nuevaVisitaForm.reset();
      this.recargarVisitas();
      this.isLoadingNew = false;
    }, error => {
      console.log(error);
      this.isLoadingNew = false;
    });
  }

  recargarVisitas() {
    this.onNuevaVisitaAdded.emit();
  }

}
