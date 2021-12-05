import { NgModule } from "@angular/core";
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

import { InputTestRiesgoComponent } from './input-test-riesgo/input-test-riesgo.component';
import { FormularioTestRiesgoComponent } from './formulario-test-riesgo/formulario-test-riesgo.component';
import { VisitaDetailComponent } from './visita-detail/visita-detail/visita-detail.component';
import { DialogBasicoActionComponent } from './dialog-basico-action/dialog-basico-action/dialog-basico-action.component';
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
        MatSlideToggleModule
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
        MatSlideToggleModule
    ]
})
export class ComponentsModule { }
