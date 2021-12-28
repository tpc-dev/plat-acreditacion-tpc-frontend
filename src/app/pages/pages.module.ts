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
import { AreasAdminComponent } from './areas-admin/areas-admin.component';
import { GerenciasAdminComponent } from './gerencias-admin/gerencias-admin.component';
import { TrabajadoresAdminComponent } from './trabajadores-admin/trabajadores-admin.component';
import { VehiculosAdminComponent } from './vehiculos-admin/vehiculos-admin.component';
import { ContratosAdceeccComponent } from './contratos-adceecc/contratos-adceecc.component';
import { EmpresasAdceeccComponent } from './empresas-adceecc/empresas-adceecc.component';
import { EmpresasRequisitosEeccComponent } from './empresas-requisitos-eecc/empresas-requisitos-eecc.component';
import { AppRoutingModule } from "../app-routing.module";
import { ContratosGestionEeccComponent } from './contratos-gestion-eecc/contratos-gestion-eecc.component';
import { CargosEeccComponent } from './cargos-eecc/cargos-eecc.component';
import { TurnosEeccComponent } from './turnos-eecc/turnos-eecc.component';
import { VehiculosEeccComponent } from './vehiculos-eecc/vehiculos-eecc.component';
import { TrabajadoresEeccComponent } from './trabajadores-eecc/trabajadores-eecc.component';
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { TrabajadoresRequisitosEeccComponent } from './trabajadores-requisitos-eecc/trabajadores-requisitos-eecc.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        MomentModule,
        AppRoutingModule,
        NgxMaterialTimepickerModule
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
        DetalleItemCarpetaArranqueAdminComponent,
        AreasAdminComponent,
        GerenciasAdminComponent,
        TrabajadoresAdminComponent,
        VehiculosAdminComponent,
        ContratosAdceeccComponent,
        EmpresasAdceeccComponent,
        EmpresasRequisitosEeccComponent,
        ContratosGestionEeccComponent,
        CargosEeccComponent,
        TurnosEeccComponent,
        VehiculosEeccComponent,
        TrabajadoresEeccComponent,
        TrabajadoresRequisitosEeccComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
