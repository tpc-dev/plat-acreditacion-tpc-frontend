import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { InputTestRiesgoComponent } from './input-test-riesgo/input-test-riesgo.component';
import { FormularioTestRiesgoComponent } from './formulario-test-riesgo/formulario-test-riesgo.component';
import { VisitaDetailComponent } from './visita-detail/visita-detail.component';
import { DialogBasicoActionComponent } from './dialog-basico-action/dialog-basico-action.component';
import { NuevaVisitaFormComponent } from './nueva-visita-form/nueva-visita-form.component';
import { TablaBuscadorVisitasComponent } from './tabla-buscador-visitas/tabla-buscador-visitas.component';
import { MomentModule } from "ngx-moment";
import { TablaBuscadorEmpresasComponent } from './tabla-buscador-empresas/tabla-buscador-empresas.component';
import { NuevaEmpresaFormComponent } from './nueva-empresa-form/nueva-empresa-form.component';
import { VisitaIngresosHistoricoComponent } from './visita-ingresos-historico/visita-ingresos-historico.component';
import { IngresarContratoStepperComponent } from './ingresar-contrato-stepper/ingresar-contrato-stepper.component';
import { FormularioProtocoloCovidComponent } from './formulario-protocolo-covid/formulario-protocolo-covid.component';
import { MatTableExporterModule } from "mat-table-exporter";
import { DetailTipoDocAcreditacionComponent } from './detail-tipo-doc-acreditacion/detail-tipo-doc-acreditacion.component';
import { TablaBuscadorAreasComponent } from './tabla-buscador-areas/tabla-buscador-areas.component';
import { NuevaAreaFormComponent } from './nueva-area-form/nueva-area-form.component';
import { TablaBuscadorGerenciasComponent } from './tabla-buscador-gerencias/tabla-buscador-gerencias.component';
import { NuevaGerenciaFormComponent } from './nueva-gerencia-form/nueva-gerencia-form.component';
import { TablaBuscadorContratosComponent } from './tabla-buscador-contratos/tabla-buscador-contratos.component';
import { ContratoDetailComponent } from './contrato-detail/contrato-detail.component';
import { RouterModule } from "@angular/router";
import { TablaBuscadorEmpresasEeccComponent } from './tabla-buscador-empresas-eecc/tabla-buscador-empresas-eecc.component';
import { UploadTipoDocumentoComponent } from './upload-tipo-documento/upload-tipo-documento.component';
import { NuevoCargoFormComponent } from './nuevo-cargo-form/nuevo-cargo-form.component';
import { NuevoTurnoFormComponent } from './nuevo-turno-form/nuevo-turno-form.component';
import { NuevoJornadaFormComponent } from './nuevo-jornada-form/nuevo-jornada-form.component';
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { TablaBuscadorTrabajadoresEeccComponent } from './tabla-buscador-trabajadores-eecc/tabla-buscador-trabajadores-eecc.component';
import { AsignarTrabajadorFormComponent } from './asignar-trabajador-form/asignar-trabajador-form.component';
import { NuevoTrabajadorFormComponent } from './nuevo-trabajador-form/nuevo-trabajador-form.component';
import { TablaBuscadorVehiculosEeccComponent } from './tabla-buscador-vehiculos-eecc/tabla-buscador-vehiculos-eecc.component';
import { AsignarVehiculoFormComponent } from './asignar-vehiculo-form/asignar-vehiculo-form.component';
import { TablaBuscadorTiposRolesComponent } from './tabla-buscador-tipos-roles/tabla-buscador-tipos-roles.component';
import { DocumentoAcreditacionDetailComponent } from './documento-acreditacion-detail/documento-acreditacion-detail.component';
import { NuevoTrabajadorTpcFormComponent } from './nuevo-trabajador-tpc-form/nuevo-trabajador-tpc-form.component';
import { EditTurnoComponent } from './edit-turno/edit-turno.component';
import { EditVehiculoComponent } from './edit-vehiculo/edit-vehiculo.component';
import { EditAreasAdminComponent } from './edit-areas-admin/edit-areas-admin.component';
import { EditGerenciaAdminComponent } from './edit-gerencia-admin/edit-gerencia-admin.component';
import { TablaBuscadorPaisesComponent } from './tabla-buscador-paises/tabla-buscador-paises.component';
import { NuevoPaisFormComponent } from './nuevo-pais-form/nuevo-pais-form.component';
import { TrabajadorDetailGuardiaComponent } from './trabajador-detail-guardia/trabajador-detail-guardia.component';
import { VehiculoDetailGuardiaComponent } from './vehiculo-detail-guardia/vehiculo-detail-guardia.component';
import { RegistroAccesoTrabajadoresContratoComponent } from './registro-acceso-trabajadores-contrato/registro-acceso-trabajadores-contrato.component';
import { TablaBuscadorTrabajadoresAdminComponent } from './tabla-buscador-trabajadores-admin/tabla-buscador-trabajadores-admin.component';
import { NuevoUsuarioFormComponent } from './nuevo-usuario-form/nuevo-usuario-form.component';
import { NuevoTrabajadorFrecuenteFormComponent } from './nuevo-trabajador-frecuente-form/nuevo-trabajador-frecuente-form.component';
import { TablaBuscadorTrabajadorFrecuenteComponent } from './tabla-buscador-trabajador-frecuente/tabla-buscador-trabajador-frecuente.component';
import { NuevaNombradaFormComponent } from './nueva-nombrada-form/nueva-nombrada-form.component';
import { TablaBuscadorNombradaComponent } from './tabla-buscador-nombrada/tabla-buscador-nombrada.component';
import { ListaTrabajadoresNombradaComponent } from './lista-trabajadores-nombrada/lista-trabajadores-nombrada.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableExporterModule,
        MatIconModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTabsModule,
        DragDropModule,
        MatRadioModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatSelectModule,
        MatStepperModule,
        MatTooltipModule,
        MomentModule,
        MatDialogModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        RouterModule,
        NgxMaterialTimepickerModule
    ],
    declarations: [
        InputTestRiesgoComponent,
        FormularioTestRiesgoComponent,
        VisitaDetailComponent,
        DialogBasicoActionComponent,
        NuevaVisitaFormComponent,
        TablaBuscadorVisitasComponent,
        TablaBuscadorEmpresasComponent,
        NuevaEmpresaFormComponent,
        VisitaIngresosHistoricoComponent,
        IngresarContratoStepperComponent,
        FormularioProtocoloCovidComponent,
        DetailTipoDocAcreditacionComponent,
        TablaBuscadorAreasComponent,
        NuevaAreaFormComponent,
        TablaBuscadorGerenciasComponent,
        NuevaGerenciaFormComponent,
        TablaBuscadorContratosComponent,
        ContratoDetailComponent,
        TablaBuscadorEmpresasEeccComponent,
        UploadTipoDocumentoComponent,
        NuevoCargoFormComponent,
        NuevoTurnoFormComponent,
        NuevoJornadaFormComponent,
        TablaBuscadorTrabajadoresEeccComponent,
        AsignarTrabajadorFormComponent,
        NuevoTrabajadorFormComponent,
        TablaBuscadorVehiculosEeccComponent,
        AsignarVehiculoFormComponent,
        TablaBuscadorTiposRolesComponent,
        DocumentoAcreditacionDetailComponent,
        NuevoTrabajadorTpcFormComponent,
        EditTurnoComponent,
        EditVehiculoComponent,
        EditAreasAdminComponent,
        EditGerenciaAdminComponent,
        TablaBuscadorPaisesComponent,
        NuevoPaisFormComponent,
        TrabajadorDetailGuardiaComponent,
        VehiculoDetailGuardiaComponent,
        RegistroAccesoTrabajadoresContratoComponent,
        TablaBuscadorTrabajadoresAdminComponent,
        NuevoUsuarioFormComponent,
        NuevoTrabajadorFrecuenteFormComponent,
        TablaBuscadorTrabajadorFrecuenteComponent,
        NuevaNombradaFormComponent,
        TablaBuscadorNombradaComponent,
        ListaTrabajadoresNombradaComponent,
    ],
    exports: [
        MatTableExporterModule,
        InputTestRiesgoComponent,
        FormularioTestRiesgoComponent,
        NuevaVisitaFormComponent,
        TablaBuscadorVisitasComponent,
        TablaBuscadorEmpresasComponent,
        NuevaEmpresaFormComponent,
        IngresarContratoStepperComponent,
        FormularioProtocoloCovidComponent,
        TablaBuscadorAreasComponent,
        NuevaAreaFormComponent,
        TablaBuscadorGerenciasComponent,
        NuevaGerenciaFormComponent,
        TablaBuscadorContratosComponent,
        TablaBuscadorEmpresasEeccComponent,
        ContratoDetailComponent,
        UploadTipoDocumentoComponent,
        NuevoCargoFormComponent,
        NuevoTurnoFormComponent,
        EditTurnoComponent,
        EditVehiculoComponent,
        EditAreasAdminComponent,
        EditGerenciaAdminComponent,
        TablaBuscadorTrabajadoresEeccComponent,
        TablaBuscadorPaisesComponent,
        NuevoPaisFormComponent,
        AsignarTrabajadorFormComponent,
        NuevoTrabajadorFormComponent,
        AsignarVehiculoFormComponent,
        TablaBuscadorVehiculosEeccComponent,
        TablaBuscadorTiposRolesComponent,
        NuevoTrabajadorTpcFormComponent,
        TrabajadorDetailGuardiaComponent,
        VehiculoDetailGuardiaComponent,
        RegistroAccesoTrabajadoresContratoComponent,
        TablaBuscadorTrabajadoresAdminComponent,
        NuevoUsuarioFormComponent,
        NuevoTrabajadorFrecuenteFormComponent,
        TablaBuscadorTrabajadorFrecuenteComponent,
        NuevaNombradaFormComponent,
        TablaBuscadorNombradaComponent,
        ListaTrabajadoresNombradaComponent,
        MatIconModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
        MatSidenavModule,
        MatToolbarModule,
        MatTabsModule,
        DragDropModule,
        MatRadioModule,
        MatListModule,
        MatGridListModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatSelectModule,
        MatStepperModule,
        MatTooltipModule,
        MatDialogModule,
        MatMenuModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        NuevoJornadaFormComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule { }
