import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemCarpetaArranque } from 'src/app/core/interfaces/itemcarpetaarranque.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-ingresar-contrato-stepper',
  templateUrl: './ingresar-contrato-stepper.component.html',
  styleUrls: ['./ingresar-contrato-stepper.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})

export class IngresarContratoStepperComponent implements OnInit {

  listEmpresas: Empresa[] = [];
  listADCTPCToAdd: Usuario[] = [];
  listADCTPCAvailable: Usuario[] = [];
  cantidadADCTPC: number[] = [];

  listADCEECC: Usuario[] = [];

  isLinear = true;
  datosRevisionFormGroup!: FormGroup;
  encargadosFormGroup!: FormGroup;
  elementosCarpetaArranque: ItemCarpetaArranque[] = []
  constructor(private elRef: ElementRef, private _formBuilder: FormBuilder, public apiService: ApiService, public authService: AuthService) {
    this.cantidadADCTPC.push(0);
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.obtenerItemsCarpetaArranque();
    this.obtenerEmpresas();
    this.obtenerADCEECC();
    this.obtenerADCTPC();
    this.datosRevisionFormGroup = this._formBuilder.group(
      {
        empresa: ['', Validators.required],
        contrato: ['', Validators.required],
        descripcionContrato: ['', Validators.required],
        areaDesempeno: ['', Validators.required],
      },
    );

    // NOMBRE DEL ADC EECC:
    // NOMBRE DEL ADC TPC
    // GERENCIA
    // ÁREA
    // fecha
    this.encargadosFormGroup = this._formBuilder.group({
      adceecc: ['', Validators.required],
      adctpc1: ['', Validators.required],
      adctpc2: ['', Validators.required],
      gerencia: ['', Validators.required],
      area: ['', Validators.required],
      fecha: ['', Validators.required,],
    });
  }

  obtenerEmpresas() {
    this.apiService.GET('/empresas').then((data) => {
      console.log(data);
      this.listEmpresas = data;
    }).catch((error) => {
      console.log(error);
    });
  }
  obtenerADCEECC() {
    // TODO ENVENTUALMENTE CAMBIAR POR EL ID CORRESPONDIENTE (5)
    this.apiService.GET('/usuarios/tiporol/5').then((data) => {
      console.log(data);
      this.listADCEECC = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  obtenerADCTPC() {
    this.apiService.GET('/usuarios/tiporol/4').then((data) => {
      console.log(data);
      this.listADCTPCAvailable = data;
    }).catch((error) => {
      console.log(error);
    });
  }



  crearNuevoContrato() {
    //   CodigoContrato contrato
    // Descripcion  descripcionContrato
    // EmpresaId   empresa
    // Empresa
    // UsuarioId
    // Usuario
    // InicioContrato
    // TerminoContrato
    // InicioAcreditacion
    // TerminoAcreditacion 
    console.log(this.datosRevisionFormGroup.value);
    console.log(this.encargadosFormGroup.value);
  }

  obtenerItemsCarpetaArranque() {
    this.apiService.GET('/item-carpeta-arranque')
      .then((data) => {
        console.log(data);
        this.elementosCarpetaArranque = data;
      }
      ).catch((error) => {
        console.log(error);
      });
  }

  addADCTPC() {
    this.cantidadADCTPC.push(this.cantidadADCTPC.length - 1);
    // this.listADCTPCAvailable.splice(x, 1);
  }

  removeADCTPC(index: number) {
    if (this.listADCTPCToAdd.length < index) return;
    console.log(index);
    console.log(this.listADCTPCAvailable[index].id);
    this.listADCTPCToAdd.splice(index, 1);
    this.cantidadADCTPC.splice(index, 1);
    console.log(this.listADCTPCToAdd);
  }

  onChangeADCTPCSelected($event: any, index: number) {
    console.log(index);
    this.listADCTPCToAdd.push(this.listADCTPCAvailable[index]);
    // console.log(this.listADCTPCToAdd);
    const dom: HTMLElement = this.elRef.nativeElement;
    const elements = dom.querySelectorAll('.select-adctpc');
    // console.log(elements);
    elements.forEach((element:Element) => {
      console.log(element.tagName)
    });
  }

  // isADCTPCAvailableToSelect(adcTPC: Usuario): boolean {
  //   return this.listADCTPCToAdd.filter(x => x.id === adcTPC.id).length === 0;
  // }


}
