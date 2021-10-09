import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './core/services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  title = 'plat-acreditacion-tpc-frontend';
  showFiller: boolean = false
  header = new HttpHeaders();
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient, private authService: AuthService, private observer: BreakpointObserver,
    private cdref: ChangeDetectorRef, public router: Router) {

    // this.header.set('Access-Control-Allow-Origin', '*');
    // this.http.get('https://localhost:44385/api/administrador-contrato-externo', { headers: this.header }).subscribe((response) => {
    //   console.log(response)
    // })
  }

  ngAfterViewInit(): void {
    this.observeSession();
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (!this.sidenav) return;
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
      this.cdref.detectChanges();
    })
  }

  observeSession() {
    this.authService.isLoggedInObservable().subscribe(status => {
      this.isLoggedIn = status;
      this.cdref.detectChanges();
      if (!this.sidenav) return;
      if (this.isLoggedIn) {
        console.log("iniciando sesion");
        this.sidenav.mode = 'side';
        this.sidenav.open();
      } else {
        console.log("cerrando sesion");
      }
    })
  }

  logout(): void {
    this.authService.setSession(false);
    this.router.navigate(['/login-tpc'])
  }
}
