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
    { name: "Empresas", icon: "business", path: '/empresas-guardia' },
    { name: "Trabajadores", icon: "engineering", path: '/trabajadores-guardia' },
    { name: "Vehiculos", icon: "local_shipping", path: '/vehiculos-guardia' },
    { name: "Visitas", icon: "groups", path: '/visitas-guardia' },
  ]

  listaItemsMenuAdminTPC: ItemMenu[] = [
    { name: "Inicio", icon: "home", path: '/home' },
    { name: "Trabajadores", icon: "engineering", path: '/trabajadores-admin' },
    { name: "Nombradas", icon: "ballot", path: '/nombrada-admin' },
    // { name: "Vehiculos", icon: "local_shipping", path: '/vehiculos-admin' },
    { name: "Visitas", icon: "groups", path: '/visitas-admin' },
  ]

  listaItemsMenuAdminContratoTPC: ItemMenu[] = [
    { name: "Inicio", icon: "home", path: '/home' },
    { name: "Contratos", icon: "description", path: '/contratos-admin' },
    { name: "Empresas", icon: "business", path: '/empresas-admin' },
    // { name: "Trabajadores", icon: "engineering", path: '/trabajadores-admin' },
    // { name: "Vehiculos", icon: "local_shipping", path: '/vehiculos-admin-tpc' },
    { name: "Visitas", icon: "groups", path: '/visitas-admin' },
  ]

  listaItemsMenuAdminContratoExterno: ItemMenu[] = [
    { name: "Inicio", icon: "home", path: '/home' },
    { name: "Contratos", icon: "description", path: '/contratos-adceecc' },
    // { name: "Empresas", icon: "business", path: '/empresas-adceecc' },
    { name: "Trabajadores", icon: "engineering", path: '/trabajadores-adceecc' },
    { name: "Vehiculos", icon: "local_shipping", path: '/vehiculos-adceecc' },
  ]

  listaItemsMenuAdminSistema: ItemMenu[] = [
    { name: "Inicio", icon: "home", path: '/home' },
    { name: "Usuarios", icon: "engineering", path: '/usuarios-admin' },
    // { name: "Trabajadores", icon: "engineering", path: '/trabajadores-tpc-admin' },
    { name: "Trabajadores", icon: "engineering", path: '/trabajadores-tpc-admin' },
    { name: "Tipo Roles", icon: "perm_identity", path: '/tipos-roles-admin' },
    { name: "Empresas", icon: "business", path: '/empresas-admin' },
    { name: "Areas", icon: "home_work", path: '/areas-admin' },
    { name: "Gerencias", icon: "groups", path: '/gerencias-admin' },
    // { name: "Generos", icon: "groups", path: '/gerencias-admin' },
    // { name: "Estado Civil", icon: "groups", path: '/gerencias-admin' },
    { name: "Paises", icon: "groups", path: '/paises-admin' },
    { name: "Elementos CA", icon: "settings", path: '/item-carpeta-arranque-admin' },
    { name: "Protocolos", icon: "settings", path: '/platform-settings-admin' },
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
    // this.apiService.getSharePointAccesToken().then((response) => {
    //   console.log(response)
    // })


    let cuenta = this.authService.getCuentaSessionStorage();
    if (cuenta) {
      this.authService.setCuentaActiva(cuenta);
      this.authService.sessionOn.next(true);
      this.apiService.setToken(cuenta.token);
      //  this.router.navigateByUrl('/home');
    }
  }

  ngAfterViewInit(): void {
    this.observeSession();
    this.observer.observe(['(max-width:1000px)']).subscribe((res) => {
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
        this.apiService.setToken(cuenta.token);
        console.log(this.cuenta.usuario.tipoRolId)
        if (this.cuenta.usuario.tipoRolId == 2) {
          this.listaItemsMenu = this.listaItemsMenuAdminTPC;
        } else if (this.cuenta.usuario.tipoRolId == 3) {
          this.listaItemsMenu = this.listaItemsMenuGuardia;
        } else if (this.cuenta.usuario.tipoRolId == 1) {
          this.listaItemsMenu = this.listaItemsMenuAdminSistema;
        } else if (this.cuenta.usuario.tipoRolId == 4) {
          this.listaItemsMenu = this.listaItemsMenuAdminContratoTPC;
        } else if (this.cuenta.usuario.tipoRolId == 5) {
          this.listaItemsMenu = this.listaItemsMenuAdminContratoExterno;
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
