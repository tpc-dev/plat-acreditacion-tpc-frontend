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

import { InputTestRiesgoComponent } from './input-test-riesgo/input-test-riesgo.component';
import { FormularioTestRiesgoComponent } from './formulario-test-riesgo/formulario-test-riesgo.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        MatExpansionModule
    ],
    declarations: [
        InputTestRiesgoComponent,
        FormularioTestRiesgoComponent,
    ],
    exports: [
        InputTestRiesgoComponent,
        FormularioTestRiesgoComponent,
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
        MatExpansionModule
    ]
})
export class ComponentsModule { }
