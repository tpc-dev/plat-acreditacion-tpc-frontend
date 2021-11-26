import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  token!: string;
  email!: string;
  resetPasswordForm: FormGroup;
  errorMessages: string[] = [];
  hasErrorService: boolean = false;
  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, public api: ApiService) {
    this.resetPasswordForm = this.createResetPasswordForm();
  }

  ngOnInit() {


    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.token = params.token;
        this.email = params.email;
        console.log(this.token);
      }
      );
  }

  resetPassword() {
    let req = {
      newPassword: this.resetPasswordForm.value.newpassword,
      token: this.token,
      email: this.email
    }

    console.log(req);
    this.hasErrorService = false;
    this.errorMessages = [];
    this.api.POST('/cuentas/reestablecer-cambiar-password', req)
      .then(res => {
        console.log(res);
        Swal.fire({
          title: 'Contraseña cambiada',
          text: 'La contraseña ha sido cambiada con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      })
      .catch(err => {
        console.log(err);
        if (err.error) {
          this.hasErrorService = true;
          err.error.forEach((error: { code: string, description: string }) => {
            switch (error.code) {
              case 'PasswordRequiresNonAlphanumeric':
                this.errorMessages.push("Las contraseñas deben tener al menos un carácter no alfanumérico");
                break;
              case 'PasswordRequiresDigit':
                this.errorMessages.push("Las contraseñas deben tener al menos un dígito ('0' - '9')");
                break;
              case 'PasswordRequiresUpper':
                this.errorMessages.push("Las contraseñas deben tener al menos una letra mayúscula ('A' - 'Z')");
                break;
              case '"PasswordRequiresLower"':
                this.errorMessages.push("Las contraseñas deben tener al menos una letra minúscula ('a' - 'z')");
                break;
            }
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'Ha ocurrido un error inesperado',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      });
  }

  onChangeRepeatPassword() {
    if (this.resetPasswordForm.value.newpassword !== this.resetPasswordForm.value.repeatpassword) {
      this.resetPasswordForm.controls['repeatpassword'].setErrors({ 'notEquivalent': true });
    } else {
      this.resetPasswordForm.controls['repeatpassword'].setErrors(null);
    }
  }

  onChangeNewPassword() {
    if (this.resetPasswordForm.value.newpassword !== this.resetPasswordForm.value.repeatpassword) {
      this.resetPasswordForm.controls['repeatpassword'].setErrors({ 'notEquivalent': true });
    } else {
      this.resetPasswordForm.controls['repeatpassword'].setErrors(null);
    }
  }

  createResetPasswordForm() {
    return this.formBuilder.group({
      newpassword: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ])
      ),
      repeatpassword: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
        ])
      ),
    });
  }
}
