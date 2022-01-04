import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ContratoDetailComponent } from './features/components/contrato-detail/contrato-detail.component';
import { FormularioProtocoloCovidComponent } from './features/components/formulario-protocolo-covid/formulario-protocolo-covid.component';
import { NuevoJornadaFormComponent } from './features/components/nuevo-jornada-form/nuevo-jornada-form.component';
import { NuevoTrabajadorFormComponent } from './features/components/nuevo-trabajador-form/nuevo-trabajador-form.component';
import { AreasAdminComponent } from './pages/areas-admin/areas-admin.component';
import { CargosEeccComponent } from './pages/cargos-eecc/cargos-eecc.component';
import { ContratosAdceeccComponent } from './pages/contratos-adceecc/contratos-adceecc.component';
import { ContratosAdminComponent } from './pages/contratos-admin/contratos-admin.component';
import { ContratosGestionEeccComponent } from './pages/contratos-gestion-eecc/contratos-gestion-eecc.component';
import { ContratosGestionTpcComponent } from './pages/contratos-gestion-tpc/contratos-gestion-tpc.component';
import { ContratosRequisitosEeccComponent } from './pages/contratos-requisitos-eecc/contratos-requisitos-eecc.component';
import { DetalleItemCarpetaArranqueAdminComponent } from './pages/detalle-item-carpeta-arranque-admin/detalle-item-carpeta-arranque-admin.component';
import { EdittestriesgosPageComponent } from './pages/edittestriesgos-page/edittestriesgos-page.component';
import { EmpresasAdceeccComponent } from './pages/empresas-adceecc/empresas-adceecc.component';
import { EmpresasAdminComponent } from './pages/empresas-admin/empresas-admin.component';
import { EmpresasGuardiaComponent } from './pages/empresas-guardia/empresas-guardia.component';
import { EmpresasRequisitosEeccComponent } from './pages/empresas-requisitos-eecc/empresas-requisitos-eecc.component';
import { EventosContratoEeccComponent } from './pages/eventos-contrato-eecc/eventos-contrato-eecc.component';
import { FormularioCovidComponent } from './pages/formulario-covid/formulario-covid.component';
import { GerenciasAdminComponent } from './pages/gerencias-admin/gerencias-admin.component';
import { HomeGuardiaComponent } from './pages/home-guardia/home-guardia.component';
import { InduccionRiesgoPageComponent } from './pages/induccion-riesgo-page/induccion-riesgo-page.component';
import { ItemCarpetaArranqueAdminComponent } from './pages/item-carpeta-arranque-admin/item-carpeta-arranque-admin.component';
import { LogintpcPageComponent } from './pages/logintpc-page/logintpc-page.component';
import { MaintpcPageComponent } from './pages/maintpc-page/maintpc-page.component';
import { MicuentaPageComponent } from './pages/micuenta-page/micuenta-page.component';
import { PaisesAdminComponent } from './pages/paises-admin/paises-admin.component';
import { PlatformSettingsAdminComponent } from './pages/platform-settings-admin/platform-settings-admin.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { TipoRolesUsuariosAdminComponent } from './pages/tipo-roles-usuarios-admin/tipo-roles-usuarios-admin.component';
import { TrabajadoresAdminEeccComponent } from './pages/trabajadores-admin-eecc/trabajadores-admin-eecc.component';
import { TrabajadoresAdminComponent } from './pages/trabajadores-admin/trabajadores-admin.component';
import { TrabajadoresEeccComponent } from './pages/trabajadores-eecc/trabajadores-eecc.component';
import { TrabajadoresGuardiaComponent } from './pages/trabajadores-guardia/trabajadores-guardia.component';
import { TrabajadoresRequisitosEeccComponent } from './pages/trabajadores-requisitos-eecc/trabajadores-requisitos-eecc.component';
import { TrabajadoresTpcAdminComponent } from './pages/trabajadores-tpc-admin/trabajadores-tpc-admin.component';
import { TurnosEeccComponent } from './pages/turnos-eecc/turnos-eecc.component';
import { UsuariosAdminComponent } from './pages/usuarios-admin/usuarios-admin.component';
import { VehiculosAdminEeccComponent } from './pages/vehiculos-admin-eecc/vehiculos-admin-eecc.component';
import { VehiculosAdminTpcComponent } from './pages/vehiculos-admin-tpc/vehiculos-admin-tpc.component';
import { VehiculosAdminComponent } from './pages/vehiculos-admin/vehiculos-admin.component';
import { VehiculosEeccComponent } from './pages/vehiculos-eecc/vehiculos-eecc.component';
import { VehiculosGuardiaComponent } from './pages/vehiculos-guardia/vehiculos-guardia.component';
import { VehiculosRequisitosEeccComponent } from './pages/vehiculos-requisitos-eecc/vehiculos-requisitos-eecc.component';
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
    component: EmpresasGuardiaComponent,
    canActivate: [AuthGuard],
    path: 'empresas-guardia'
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
    component: VehiculosAdminTpcComponent,
    canActivate: [AuthGuard],
    path: 'vehiculos-admin-tpc'
  }
  ,
  {
    component: PaisesAdminComponent,
    canActivate: [AuthGuard],
    path: 'paises-admin'
  }
  ,
  {
    component: TipoRolesUsuariosAdminComponent,
    canActivate: [AuthGuard],
    path: 'tipos-roles-admin'
  }
  ,
  {
    component: TrabajadoresAdminEeccComponent,
    canActivate: [AuthGuard],
    path: 'trabajadores-adceecc'
  }
  ,
  {
    component: VehiculosAdminEeccComponent,
    canActivate: [AuthGuard],
    path: 'vehiculos-adceecc'
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
  },
  {
    component: VehiculosAdminComponent,
    canActivate: [AuthGuard],
    path: 'vehiculos-admin'
  },
  {
    component: TrabajadoresAdminComponent,
    canActivate: [AuthGuard],
    path: 'trabajadores-admin'
  },
  {
    component: TrabajadoresTpcAdminComponent,
    canActivate: [AuthGuard],
    path: 'trabajadores-tpc-admin'
  }
  ,
  {
    component: ContratosAdceeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-adceecc'
  },
  {
    component: ContratosGestionEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id',
  }
  ,
  {
    component: ContratosGestionTpcComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-tpc/:id',
  }
  ,
  {
    component: EmpresasAdceeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/empresas-contratadas'
  }
  ,
  {
    component: EmpresasAdceeccComponent,
    canActivate: [AuthGuard],
    path: 'empresas-adceecc'
  }
  ,
  {
    component: EmpresasRequisitosEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/empresas-contratadas/requisitos',
  }
  ,
  {
    component: VehiculosRequisitosEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/vehiculos/requisitos',
  }
  ,
  {
    component: EventosContratoEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/eventos',
  }
  ,
  {
    component: TrabajadoresEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/trabajadores',
  }
  ,
  {
    component: NuevoTrabajadorFormComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/trabajadores/nuevo-trabajador',
  }
  ,
  {
    component: TrabajadoresRequisitosEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/trabajadores/requisitos',
  }
  ,
  {
    component: ContratosRequisitosEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/contrato/requisitos',
  }
  ,
  {
    component: ContratosRequisitosEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-tpc/:id/contrato/requisitos',
  }
  ,
  {
    component: CargosEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/cargos',
  }
  ,
  {
    component: TurnosEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/turnos',
  }
  ,
  {
    component: NuevoJornadaFormComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/turnos/nueva-jornada',
  }
  ,
  {
    component: VehiculosEeccComponent,
    canActivate: [AuthGuard],
    path: 'contratos-gestion-eecc/:id/vehiculos',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
