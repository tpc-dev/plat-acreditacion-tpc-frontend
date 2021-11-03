import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './core/services/auth/auth.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ItemMenu } from './core/interfaces/itemmenu.interface';
import { Cuenta } from './core/interfaces/cuenta.interface';
import * as moment from 'moment';
import { ApiService } from './core/services/api/api.service';

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
  listaItemsMenu: ItemMenu[] = [];
  listaItemsMenuGuardia: ItemMenu[] = [
    { name: "Inicio", icon: "home", path: '/home-guardia' },
    { name: "Empresas", icon: "business", path: '/trabajadores-guardia' },
    { name: "Trabajadores", icon: "engineering", path: '/trabajadores-guardia' },
    { name: "Vehiculos", icon: "local_shipping", path: '/vehiculos-guardia' },
    { name: "Visitas", icon: "groups", path: '/visitas-guardia' },
  ]

  listaItemsMenuAdminTPC: ItemMenu[] = [
    { name: "Inicio", icon: "home", path: '/home-guardia' },
    { name: "Trabajadores", icon: "engineering", path: '/trabajadores-guardia' },
    { name: "Vehiculos", icon: "local_shipping", path: '/vehiculos-guardia' },
    { name: "Visitas", icon: "groups", path: '/visitas-admin' },
  ]

  listaItemsMenuAdminSistema: ItemMenu[] = [
    { name: "Inicio", icon: "home", path: '/home-guardia' },
    { name: "Usuarios", icon: "engineering", path: '/usuarios-admin' },
    // { name: "Vehiculos", icon: "local_shipping", path: '/vehiculos-guardia' },
    // { name: "Visitas", icon: "groups", path: '/visitas-admin' },
  ]

  cuenta!: Cuenta;
  constructor(private http: HttpClient, private authService: AuthService, private observer: BreakpointObserver,
    private cdref: ChangeDetectorRef, public router: Router, public apiService: ApiService) {
    moment.locale('es');

    // this.header.set('Access-Control-Allow-Origin', '*');
    // this.http.get('https://localhost:44385/api/administrador-contrato-externo', { headers: this.header }).subscribe((response) => {
    //   console.log(response)
    // })
    let cuenta = this.authService.getCuentaSessionStorage();
    if (cuenta) {
      this.authService.setCuentaActiva(cuenta);
      this.authService.sessionOn.next(true);
      this.apiService.setToken(cuenta.token);
      this.router.navigateByUrl('/home');
    }
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
      console.log("status " + status)
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

    this.authService.getCuentaActiva().subscribe(cuenta => {
      this.cdref.detectChanges();
      if (this.isLoggedIn) {
        this.cuenta = cuenta;
        if (this.cuenta.usuario.tipoRolId == 2) {
          this.listaItemsMenu = this.listaItemsMenuAdminTPC
        } else if (this.cuenta.usuario.tipoRolId == 3) {
          this.listaItemsMenu = this.listaItemsMenuGuardia
        } else if (this.cuenta.usuario.tipoRolId == 1) {
          this.listaItemsMenu = this.listaItemsMenuAdminSistema
        }
      }
    })
  }

  logout(): void {
    this.router.navigate(['/login-tpc'])
    this.authService.signOut();
  }

  changePageMenu({ path }: ItemMenu): void {
    this.router.navigate([path]);
  }
}
