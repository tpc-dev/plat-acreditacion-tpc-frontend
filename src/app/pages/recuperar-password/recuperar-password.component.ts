import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.scss']
})
export class RecuperarPasswordComponent implements OnInit {
  emailResForm: FormGroup;
  isLoading: boolean = false;
  constructor(public formBuilder: FormBuilder, public api: ApiService, public auth: AuthService) {
    this.emailResForm = this.createEmailResForm();

  }

  createEmailResForm() {
    return this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ),
    });
  }

  ngOnInit(): void {
  }

  enviarCorreoSolicitud() {
    this.isLoading = true;
    console.log(this.emailResForm.value.email);
    if (this.emailResForm.valid) {
      this.api.POST(`/cuentas/solicitar-recuperar-password?email=${this.emailResForm.value.email}`, {})
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.emailResForm.reset();
          Swal.fire({
            title: 'Solicitud enviada',
            text: 'Se ha enviado un correo a la dirección de correo electrónico proporcionada con las instrucciones para recuperar su contraseña.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
        })
        .catch((error) => {
          console.log(error);

          this.isLoading = false;
          Swal.fire({
            title: 'Error',
            // text: 'Ha ocurrido un error al enviar la solicitud, por favor intente nuevamente.',
            text: error.error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
}
