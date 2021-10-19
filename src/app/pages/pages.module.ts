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


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
    ],
    declarations: [
        LogintpcPageComponent,
        MaintpcPageComponent,
        EdittestriesgosPageComponent,
        VisitasGuardiaComponent,
        VehiculosGuardiaComponent,
        TrabajadoresGuardiaComponent,
        HomeGuardiaComponent],
})
export class PagesModule { }
