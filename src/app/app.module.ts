import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './core/services/auth/auth.service';
import { ComponentsModule } from './features/components/components.module';
import { PagesModule } from './pages/pages.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentModule } from 'ngx-moment';
import { ApiService } from './core/services/api/api.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { TPC_DATE_FORMATS } from './core/constants/TPC_DATE_FORMATS';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { SharepointapiService } from './core/services/sharepointapi/sharepointapi.service';

//#endregion

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ComponentsModule,
    LayoutModule,
    MatNativeDateModule,
    MomentModule,
    MomentDateModule,
    MatTableExporterModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    AuthService,
    ApiService,
    SharepointapiService,
    { provide: MAT_DATE_FORMATS, useValue: TPC_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
