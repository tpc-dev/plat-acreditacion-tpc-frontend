import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cuenta, TipoRol } from 'src/app/core/interfaces/cuenta.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-logintpc',
  templateUrl: './logintpc-page.component.html',
  styleUrls: ['./logintpc-page.component.scss']
})
export class LogintpcPageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router) {
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

      const data = {
        "email": "guardiuno@tpc.com",
        "password": "Guardia1@"
      }
      this.authService.signIn(data).subscribe((resCuenta: Cuenta) => {
        console.log(resCuenta)
        this.authService.setCuentaActiva(resCuenta);
        this.authService.setCuentaSessionStorage(resCuenta);
        this.authService.sessionOn.next(true);
        this.router.navigateByUrl('/home');
        // this.redirectByRol(resCuenta.usuario.tipoRol);
      }, error => {
        console.log(error);
      }, () => {
        console.log("completado");
      })
    }
  }

  redirectByRol(tipoRol: TipoRol): void {
    switch (tipoRol.id) {
      case 2:
        this.router.navigateByUrl('/home');
        break;
      case 3:
        this.router.navigateByUrl('/home');
        break;
    }
  }

  createloginForm() {
    return this.formBuilder.group({
      username: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.maxLength(20),
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
