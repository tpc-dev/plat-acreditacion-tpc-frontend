import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { EdittestriesgosPageComponent } from './pages/edittestriesgos-page/edittestriesgos-page.component';
import { HomeGuardiaComponent } from './pages/home-guardia/home-guardia.component';
import { LogintpcPageComponent } from './pages/logintpc-page/logintpc-page.component';
import { MaintpcPageComponent } from './pages/maintpc-page/maintpc-page.component';
import { TrabajadoresGuardiaComponent } from './pages/trabajadores-guardia/trabajadores-guardia.component';
import { VehiculosGuardiaComponent } from './pages/vehiculos-guardia/vehiculos-guardia.component';
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
    component: EdittestriesgosPageComponent,
    // canActivate: [AuthGuard],
    path: 'edit-test-riesgos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
