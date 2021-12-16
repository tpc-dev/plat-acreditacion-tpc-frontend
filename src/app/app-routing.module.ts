import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ContratoDetailComponent } from './features/components/contrato-detail/contrato-detail.component';
import { FormularioProtocoloCovidComponent } from './features/components/formulario-protocolo-covid/formulario-protocolo-covid.component';
import { AreasAdminComponent } from './pages/areas-admin/areas-admin.component';
import { ContratosAdminComponent } from './pages/contratos-admin/contratos-admin.component';
import { DetalleItemCarpetaArranqueAdminComponent } from './pages/detalle-item-carpeta-arranque-admin/detalle-item-carpeta-arranque-admin.component';
import { EdittestriesgosPageComponent } from './pages/edittestriesgos-page/edittestriesgos-page.component';
import { EmpresasAdminComponent } from './pages/empresas-admin/empresas-admin.component';
import { FormularioCovidComponent } from './pages/formulario-covid/formulario-covid.component';
import { GerenciasAdminComponent } from './pages/gerencias-admin/gerencias-admin.component';
import { HomeGuardiaComponent } from './pages/home-guardia/home-guardia.component';
import { InduccionRiesgoPageComponent } from './pages/induccion-riesgo-page/induccion-riesgo-page.component';
import { ItemCarpetaArranqueAdminComponent } from './pages/item-carpeta-arranque-admin/item-carpeta-arranque-admin.component';
import { LogintpcPageComponent } from './pages/logintpc-page/logintpc-page.component';
import { MaintpcPageComponent } from './pages/maintpc-page/maintpc-page.component';
import { MicuentaPageComponent } from './pages/micuenta-page/micuenta-page.component';
import { PlatformSettingsAdminComponent } from './pages/platform-settings-admin/platform-settings-admin.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
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
    canLoad: [AuthGuard],
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
    path: 'contratos-admin',
    // children: [
    //   {
    //     component: ContratoDetailComponent,
    //     canActivate: [AuthGuard],
    //     path: 'contrato-detail'
    //   }
    // ]
  },
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
  ,
  {
    component: FormularioCovidComponent,
    // canActivate: [AuthGuard],
    path: 'formulario-covid'
  }
  ,
  {
    component: ResetpasswordComponent,
    // canActivate: [AuthGuard],
    path: 'resetpassword'
  }
  ,
  {
    component: RecuperarPasswordComponent,
    // canActivate: [AuthGuard],
    path: 'recuperar-password'
  }
  ,
  {
    component: ItemCarpetaArranqueAdminComponent,
    canActivate: [AuthGuard],
    path: 'item-carpeta-arranque-admin',
  },
  {
    component: DetalleItemCarpetaArranqueAdminComponent,
    canActivate: [AuthGuard],
    path: 'item-carpeta-arranque-admin/:id'
  },
  {
    component: AreasAdminComponent,
    canActivate: [AuthGuard],
    path: 'areas-admin'
  },
  {
    component: GerenciasAdminComponent,
    canActivate: [AuthGuard],
    path: 'gerencias-admin'
  },
  {
    component: ContratoDetailComponent,
    canActivate: [AuthGuard],
    path: 'contrato-detail'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
