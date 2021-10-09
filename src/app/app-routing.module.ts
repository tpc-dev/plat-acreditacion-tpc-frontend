import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { EdittestriesgosPageComponent } from './pages/edittestriesgos-page/edittestriesgos-page.component';
import { LogintpcPageComponent } from './pages/logintpc-page/logintpc-page.component';
import { MaintpcPageComponent } from './pages/maintpc-page/maintpc-page.component';
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
