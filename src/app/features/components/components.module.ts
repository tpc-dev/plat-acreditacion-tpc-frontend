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

import { LoginformComponent } from "./loginform/loginform.component";
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
        MatFormFieldModule
    ],
    declarations: [
        LoginformComponent,
        InputTestRiesgoComponent,
        FormularioTestRiesgoComponent,
    ],
    exports: [
        LoginformComponent,
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
        MatFormFieldModule
    ]
})
export class ComponentsModule { }
