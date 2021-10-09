import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-logintpc',
  templateUrl: './logintpc-page.component.html',
  styleUrls: ['./logintpc-page.component.css']
})
export class LogintpcPageComponent implements OnInit {

  loginForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public authService: AuthService, public router: Router) {
    this.loginForm = this.createloginForm();
  }

  ngOnInit(): void {
  }

  doLogin(): void {
    this.authService.sessionOn.next(true);
    this.router.navigateByUrl('/home')
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid) {
      console.warn('complete datos validos');

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
