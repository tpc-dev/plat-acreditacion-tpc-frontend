import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ContratosAdminComponent } from './pages/contratos-admin/contratos-admin.component';
import { EdittestriesgosPageComponent } from './pages/edittestriesgos-page/edittestriesgos-page.component';
import { EmpresasAdminComponent } from './pages/empresas-admin/empresas-admin.component';
import { HomeGuardiaComponent } from './pages/home-guardia/home-guardia.component';
import { InduccionRiesgoPageComponent } from './pages/induccion-riesgo-page/induccion-riesgo-page.component';
import { LogintpcPageComponent } from './pages/logintpc-page/logintpc-page.component';
import { MaintpcPageComponent } from './pages/maintpc-page/maintpc-page.component';
import { MicuentaPageComponent } from './pages/micuenta-page/micuenta-page.component';
import { PlatformSettingsAdminComponent } from './pages/platform-settings-admin/platform-settings-admin.component';
import { TipoRolesUsuariosAdminComponent } from './pages/tipo-roles-usuarios-admin/tipo-roles-usuarios-admin.component';
import { TrabajadoresGuardiaComponent } from './pages/trabajadores-guardia/trabajadores-guardia.component';
import { UsuariosAdminComponent } from './pages/usuarios-admin/usuarios-admin.component';
import { VehiculosGuardiaComponent } from './pages/vehiculos-guardia/vehiculos-guardia.component';
import { VisitasAdminComponent } from './pages/visitas-admin/visitas-admin.component';
import { VisitasGuardiaComponent } from './pages/visitas-guardia/visitas-guardia.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-tpc', pathMatch: 'full' },
  // { path: '**', component: NotfoundComponent },
  {
    component: LogintpcPageComponent,
    path: 'login-tpc'
  },
  {
    component: MaintpcPageComponent,
    canActivate: [AuthGuard],
    path: 'home'
  }
  ,
  {
    component: VisitasGuardiaComponent,
    canActivate: [AuthGuard],
    path: 'visitas-guardia'
  }
  ,
  {
    component: VisitasAdminComponent,
    canActivate: [AuthGuard],
    path: 'visitas-admin'
  }
  ,
  {
    component: VehiculosGuardiaComponent,
    canActivate: [AuthGuard],
    path: 'vehiculos-guardia'
  }
  ,
  {
    component: TrabajadoresGuardiaComponent,
    canActivate: [AuthGuard],
    path: 'trabajadores-guardia'
  }
  ,
  {
    component: HomeGuardiaComponent,
    canActivate: [AuthGuard],
    path: 'home-guardia'
  }
  ,
  {
    component: UsuariosAdminComponent,
    canActivate: [AuthGuard],
    path: 'usuarios-admin'
  }
  ,
  {
    component: ContratosAdminComponent,
    canActivate: [AuthGuard],
    path: 'contratos-admin'
  }
  ,
  {
    component: PlatformSettingsAdminComponent,
    canActivate: [AuthGuard],
    path: 'platform-settings-admin'
  }
  ,
  {
    component: EmpresasAdminComponent,
    canActivate: [AuthGuard],
    path: 'empresas-admin'
  }
  ,
  {
    component: TipoRolesUsuariosAdminComponent,
    canActivate: [AuthGuard],
    path: 'tipos-roles-admin'
  }
  ,
  {
    component: EdittestriesgosPageComponent,
    // canActivate: [AuthGuard],
    path: 'edit-test-riesgos'
  }
  ,
  {
    component: InduccionRiesgoPageComponent,
    // canActivate: [AuthGuard],
    path: 'induccion-riesgo'
  }
  ,
  {
    component: MicuentaPageComponent,
    // canActivate: [AuthGuard],
    path: 'mi-cuenta'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
