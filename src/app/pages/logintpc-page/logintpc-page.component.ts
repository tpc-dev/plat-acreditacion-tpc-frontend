import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Cuenta, TipoRol } from 'src/app/core/interfaces/cuenta.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logintpc',
  templateUrl: './logintpc-page.component.html',
  styleUrls: ['./logintpc-page.component.scss']
})
export class LogintpcPageComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean = false;
  constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router, private _snackBar: MatSnackBar) {
    this.loginForm = this.createloginForm();
  }

  ngOnInit(): void {
    console.log('doLogindoLogindoLogin')
  }

  doLogin(): void {
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) {
      console.warn('complete datos validosvalidosvalidosvalidosvalidos');
    } else {
      console.log(this.loginForm.get('username')?.value || '');
      console.log(this.loginForm.get('password')?.value || '');

      const credenciales = {
        "email": this.loginForm.get('username')?.value,
        "password": this.loginForm.get('password')?.value
      }
      this.isLoading = true;
      this.authService.signIn(credenciales).subscribe((resCuenta: Cuenta) => {
        console.log(resCuenta)
        this.isLoading = false;
        this.authService.sessionOn.next(true);
        this.authService.setCuentaSessionStorage(resCuenta);
        this.authService.setCuentaActiva(resCuenta);
        this.router.navigateByUrl('/home');
        // this.redirectByRol(resCuenta.usuario.tipoRol);
      }, error => {
        console.error(error);
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: error.error,
          text: 'Ha ocurrido un problema y no se pudo ingresar',
        })
      }, () => {
        console.log("completado");
      })
    }
  }

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, '', { duration: duration });
  }

  redirectByRol(tipoRol: TipoRol): void {
    switch (tipoRol.id) {
      case 1:
        this.router.navigateByUrl('/home');
        break;
      case 2:
        this.router.navigateByUrl('/home');
        break;
      case 3:
        this.router.navigateByUrl('/home');
        break;
    }
  }

  irEncuestaInduccion(): void {
    this.router.navigateByUrl('/induccion-riesgo');
  }

  createloginForm() {
    return this.formBuilder.group({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ])
      ),
    });
  }

}
