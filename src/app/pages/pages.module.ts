import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/features/components/components.module";
import { MaintpcPageComponent } from "./maintpc-page/maintpc-page.component";
import { LogintpcPageComponent } from "./logintpc-page/logintpc-page.component";
import { EdittestriesgosPageComponent } from './edittestriesgos-page/edittestriesgos-page.component';


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
        EdittestriesgosPageComponent],
})
export class PagesModule { }
