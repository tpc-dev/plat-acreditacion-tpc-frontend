import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/features/components/components.module";
import { MaintpcPageComponent } from "./maintpc-page/maintpc-page.component";
import { LogintpcPageComponent } from "./logintpc-page/logintpc-page.component";
import { EdittestriesgosPageComponent } from './edittestriesgos-page/edittestriesgos-page.component';
import { VisitasGuardiaComponent } from './visitas-guardia/visitas-guardia.component';
import { VehiculosGuardiaComponent } from './vehiculos-guardia/vehiculos-guardia.component';
import { TrabajadoresGuardiaComponent } from './trabajadores-guardia/trabajadores-guardia.component';
import { HomeGuardiaComponent } from './home-guardia/home-guardia.component';
import { VisitasAdminComponent } from './visitas-admin/visitas-admin.component';
import { InduccionRiesgoPageComponent } from './induccion-riesgo-page/induccion-riesgo-page.component';
import { MomentModule } from 'ngx-moment';
import { UsuariosAdminComponent } from './usuarios-admin/usuarios-admin.component';
import { TipoRolesUsuariosAdminComponent } from './tipo-roles-usuarios-admin/tipo-roles-usuarios-admin.component';
import { ContratosAdminComponent } from './contratos-admin/contratos-admin.component';
import { EmpresasAdminComponent } from './empresas-admin/empresas-admin.component';
import { PlatformSettingsAdminComponent } from './platform-settings-admin/platform-settings-admin.component';
import { MicuentaPageComponent } from './micuenta-page/micuenta-page.component';
import { FormularioCovidComponent } from './formulario-covid/formulario-covid.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RecuperarPasswordComponent } from './recuperar-password/recuperar-password.component';
import { ItemCarpetaArranqueAdminComponent } from './item-carpeta-arranque-admin/item-carpeta-arranque-admin.component';
import { DetalleItemCarpetaArranqueAdminComponent } from './detalle-item-carpeta-arranque-admin/detalle-item-carpeta-arranque-admin.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        MomentModule
    ],
    declarations: [
        LogintpcPageComponent,
        MaintpcPageComponent,
        EdittestriesgosPageComponent,
        VisitasGuardiaComponent,
        VehiculosGuardiaComponent,
        TrabajadoresGuardiaComponent,
        HomeGuardiaComponent,
        VisitasAdminComponent,
        InduccionRiesgoPageComponent,
        UsuariosAdminComponent,
        TipoRolesUsuariosAdminComponent,
        ContratosAdminComponent,
        EmpresasAdminComponent,
        PlatformSettingsAdminComponent,
        MicuentaPageComponent,
        FormularioCovidComponent,
        ResetpasswordComponent,
        RecuperarPasswordComponent,
        ItemCarpetaArranqueAdminComponent,
        DetalleItemCarpetaArranqueAdminComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
