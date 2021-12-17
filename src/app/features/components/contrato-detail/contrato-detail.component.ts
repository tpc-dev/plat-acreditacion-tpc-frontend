import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStep, MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { EtapaCreacionContrato } from 'src/app/core/interfaces/etapacreacioncontrato.interface';
import { ItemCarpetaArranque } from 'src/app/core/interfaces/itemcarpetaarranque.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contrato-detail',
  templateUrl: './contrato-detail.component.html',
  styleUrls: ['./contrato-detail.component.scss']
})
export class ContratoDetailComponent implements OnInit {
  @ViewChild('stepper') stepper: MatVerticalStepper;
  @ViewChild('stepperOne') stepperOne: MatStep;
  @ViewChild('stepperTwo') stepperTwo: MatStep;
  @ViewChild('stepperThree') stepperThree: MatStep;
  listEmpresas: Empresa[] = [];
  listAreas: any[] = [];
  listGerencias: any[] = [];
  listADCTPCToAdd: Usuario[] = [];
  listADCTPCAvailable: Usuario[] = [];
  cantidadADCTPC: number[] = [];

  listEtapasCreacionContrato: EtapaCreacionContrato[] = [];
  listADCEECC: Usuario[] = [];
  isLinear = true;
  datosRevisionFormGroup!: FormGroup;
  encargadosFormGroup!: FormGroup;
  elementosCarpetaArranque: ItemCarpetaArranque[] = []
  contratoGuardado: boolean = false;
  rangoFechasInvalido = false;
  minFechaContrato = new Date();
  maxFechaContrato = new Date();
  currentContrato: any;
  etapa: number;

  listContratoUsuarios = [];
  constructor(private route: ActivatedRoute, private router: Router, private elRef: ElementRef, private _formBuilder: FormBuilder,
    public apiService: ApiService, public authService: AuthService, private _snackBar: MatSnackBar, private readonly changeDetectorRef: ChangeDetectorRef) {
    this.cantidadADCTPC.push(0);
    if (this.router.getCurrentNavigation()?.extras.state) {
      console.log(this.router.getCurrentNavigation()?.extras.state);
      this.currentContrato = this.router.getCurrentNavigation()?.extras.state?.contrato;
      this.etapa = this.router.getCurrentNavigation()?.extras.state?.etapa;
      if (this.etapa >= 2) {
        this.obtenerContratoUsuarios();
      }
    } else {
      this.router.navigate(['/contratos-admin']);
    }
  }

  public ngAfterViewInit(): void {
    //this.loadContratoDataToForm();
  }


  loadContratoDataToForm() {

    // COMPLETAR DATOS ETAPA UNO
    if (this.etapa >= 1) {
      this.datosRevisionFormGroup.get('contrato')?.setValue(this.currentContrato.codigoContrato);
      this.datosRevisionFormGroup.get('empresa')?.setValue(this.currentContrato.empresaContrato.empresaId);
      this.datosRevisionFormGroup.get('areaDesempeno')?.setValue(this.currentContrato.areaId);
      this.datosRevisionFormGroup.get('fechaInicio')?.setValue(this.currentContrato.inicioContrato);
      this.datosRevisionFormGroup.get('fechaFin')?.setValue(this.currentContrato.terminoContrato);
      this.datosRevisionFormGroup.get('descripcionContrato')?.setValue(this.currentContrato.codigoContrato);
      this.stepperOne.completed = true;
    }

    // COMPLETAR DATOS ETAPA DOS
    if (this.etapa >= 2) {
      let adctpc1: any = this.listContratoUsuarios.find((contrato: any) => contrato.usuario.tipoRol.id == 4);
      let adctpc2: any = this.listContratoUsuarios.find((contrato: any) => contrato.usuario.tipoRol.id == 4 && contrato.usuario.id != adctpc1?.usuario.id);
      let adceecc: any = this.listContratoUsuarios.find((contrato: any) => contrato.usuario.tipoRol.id == 5);

      if (adctpc2) {
        this.encargadosFormGroup.get('adctpc2')?.setValue(adctpc2?.usuario.id);
        this.encargadosFormGroup.get('area2')?.setValue(adctpc2.areaId);
        this.encargadosFormGroup.get('gerencia2')?.setValue(adctpc2.gerenciaId);
      }

      this.encargadosFormGroup.get('adctpc1')?.setValue(adctpc1.usuario.id);
      this.encargadosFormGroup.get('adceecc')?.setValue(adceecc.usuario.id);
      this.encargadosFormGroup.get('area')?.setValue(adctpc1.areaId);
      this.encargadosFormGroup.get('gerencia')?.setValue(adctpc1.gerenciaId);

      this.stepperTwo.completed = true;
    }

    // COMPLETAR DATOS ETAPA TRES
    if (this.etapa >= 3) {
      // this.stepperThree.completed = true;
    }

    this.changeDetectorRef.detectChanges();
    //this.setStepperEnEtapa();
  }

  obtenerContratoUsuarios() {
    this.apiService.GET(`/contratos/${this.currentContrato.id}/contrato-usuarios`)
      .then((res: any) => {
        console.log(res);
        this.listContratoUsuarios = res;
        this.loadContratoDataToForm();
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  setStepperEnEtapa() {
    // this.selectedIndex = this.etapa - 1;
    // if (this.etapa == 1) {
    //   this.selectedIndex="2".
    // }
    // if (this.etapa == 2) {
    //   this.stepper.selectedIndex = 1;
    // }
    // if (this.etapa == 3) {
    //   this.stepper.selectedIndex = 2;
    // }
  }



  ngOnInit() {

    this.obtenerEtapaCreacionContrato();
    this.obtenerItemsCarpetaArranque();
    this.obtenerEmpresas();
    this.obtenerAreas();
    this.obtenerGerencias();
    this.obtenerADCEECC();
    this.obtenerADCTPC();

    this.datosRevisionFormGroup = this._formBuilder.group(
      {
        empresa: ['', Validators.required],
        contrato: ['', Validators.required],
        descripcionContrato: ['', Validators.required],
        areaDesempeno: ['', Validators.required],
        fechaInicio: ['', Validators.required,],
        fechaFin: ['', Validators.required,],
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
      adctpc2: [''],
      gerencia: ['', Validators.required],
      area: ['', Validators.required],
      gerencia2: [''],
      area2: [''],
    });

  }

  obtenerEtapaCreacionContrato() {
    this.apiService.GET('/etapa-creacion-contrato')
      .then((data: EtapaCreacionContrato[]) => {
        this.listEtapasCreacionContrato = data;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
  }

  // TODO TRAER EMPRESAS ACTICAS
  obtenerEmpresas() {
    // this.apiService.GET('/empresas').then((data) => {
    // this.apiService.GET('/empresas').then((data) => {
    this.apiService.GET('/empresas/activos').then((data) => {
      // console.log(data);
      this.listEmpresas = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  obtenerAreas() {
    this.apiService.GET('/areas/activos').then((data) => {
      // console.log(data);
      this.listAreas = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  obtenerGerencias() {
    this.apiService.GET('/gerencias/activos').then((data) => {
      // console.log(data);
      this.listGerencias = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  obtenerADCEECC() {
    // TODO ENVENTUALMENTE CAMBIAR POR EL ID CORRESPONDIENTE (5)
    this.apiService.GET('/usuarios/tiporol/5').then((data) => {
      // console.log(data);
      this.listADCEECC = data;
    }).catch((error) => {
      console.log(error);
    });
  }

  obtenerADCTPC() {
    this.apiService.GET('/usuarios/tiporol/4').then((data) => {
      // console.log(data);
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
        // console.log(data);
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
    elements.forEach((element: Element) => {
      console.log(element.tagName)
    });
  }

  async verificarContrato() {
    let contratoExiste: boolean = await this.apiService.GET(`/contratos/existe/${this.datosRevisionFormGroup.get('contrato')?.value}`);
    if (contratoExiste) this.datosRevisionFormGroup.get('contrato')?.setErrors({ existe: contratoExiste });
    return contratoExiste;
  }

  showContratoExisteAlert() {
    Swal.fire({
      title: 'Contrato ya existe',
      text: 'El contrato ya existe',
      icon: 'error',
      confirmButtonText: 'Ok'
    });
  }


  setFechaMinimoTerminoContrato() {
    // if (!this.datosRevisionFormGroup.get('fechaInicio')?.value) return;
    // this.datosRevisionFormGroup.get('fechaFin')?.setValue(this.datosRevisionFormGroup.get('fechaInicio')?.value);
  }

  setFechaMaximoInicioContrato() {
    // if (!this.datosRevisionFormGroup.get('fechaFin')?.value) return;
    // this.datosRevisionFormGroup.get('fechaInicio')?.setValue(this.datosRevisionFormGroup.get('fechaFin')?.value);
  }



  async guardarContratoPaso1() {
    const contratoExiste: boolean = await this.verificarContrato();
    if (contratoExiste) {
      this.showContratoExisteAlert();
      return;
    }

    const contrato = {
      CodigoContrato: this.datosRevisionFormGroup.get('contrato')?.value,
      Descripcion: this.datosRevisionFormGroup.get('descripcionContrato')?.value,
      AreaId: this.datosRevisionFormGroup.get('areaDesempeno')?.value,
      InicioContrato: this.datosRevisionFormGroup.get('fechaInicio')?.value.toDate(),
      TerminoContrato: this.datosRevisionFormGroup.get('fechaFin')?.value.toDate(),
      Activo: true,
      EtapaCreacionContratoId: this.listEtapasCreacionContrato.find(x => x.orden == 1)?.id,
    }

    let empresaContrato = {
      EmpresaId: this.datosRevisionFormGroup.get('empresa')?.value,
      ContratoId: null,
    };

    this.apiService.POST('/contratos', contrato)
      .then((data) => {
        console.log(data)
        this.currentContrato = data;
        empresaContrato.ContratoId = this.currentContrato.id;
        this._snackBar.open('Contrato creado con éxito', '', {
          duration: 2000,
          verticalPosition: 'bottom',
        });
        console.log(empresaContrato);
        return this.apiService.POST('/contratos/completar-paso-uno', empresaContrato);
      })
      .then((data) => {
        this.stepper.next();
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Error al guardar contrato',
          text: 'El contrato no se pudo guardar',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      });

  }

  guardarContratoPaso2() {
    // const idEtapa = this.listEtapasCreacionContrato.find(x => x.orden == 2)?.id;
    // // TODO crear registro en tabla contrato usuario
    // // ACTUALIZAR ETAPA DE CONTRATO

    // const pasoDosData = {
    //     adctpc: this.,
    // };

    // this.apiService.PUT(`/contratos/${this.currentContrato.id}/actualizar-etapa/${idEtapa}`, {})
    //   .then((data) => {
    //     console.log(data);
    //     return this.apiService.POST('/contratos/completar-paso-dos', pasoDosData);
    //   })

    //CREAR REGISTRO EN TABLA CONTRATO USUARIO POR CADA ADC TPC Y EL ADC EECC

    // this.apiService.PUT(`/contratos/cambiar-etapa-creacion/${this.currentContrato.id}`, { idEtapa: idEtapa })
    //   .then((data) => {
    //     console.log(data);
    //     this.currentContrato = data;
    //     // this.obtenerContrato();
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .finally(() => {
    //   });
  }

  guardarContratoPaso3() {
    const idEtapa = this.listEtapasCreacionContrato.find(x => x.orden == 3)?.id;
    this.apiService.PUT(`/contratos/cambiar-etapa-creacion/${this.currentContrato.id}`, { idEtapa: idEtapa })
      .then((data) => {
        console.log(data);
        this.currentContrato = data;
        // this.obtenerContrato();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
      });
  }


  // ACTUALIZAR CAMBIOS PASO 1
  actualizarCambiosPasoUno() {
    console.log("actualizarCambiosPasoUno");
  }

  // ACTUZALIZAR CAMBIOS PASO 2
  actualizarCambiosPasoDos() {
    console.log("actualizarCambiosPasoDos");
  }

  // ACTUALIZAR CAMBIOS PASO 3
  actualizarCambiosPasoTres() {
    console.log("actualizarCambiosPasoTres");
  }

}
