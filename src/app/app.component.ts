import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'plat-acreditacion-tpc-frontend';
  showFiller: boolean = false
  header = new HttpHeaders();
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.isLoggedInObservable().subscribe(status => {
      this.isLoggedIn = status;
    })
    this.header.set('Access-Control-Allow-Origin', '*');
    this.http.get('https://localhost:44385/api/administrador-contrato-externo', { headers: this.header }).subscribe((response) => {
      console.log(response)
    })
  }
}
