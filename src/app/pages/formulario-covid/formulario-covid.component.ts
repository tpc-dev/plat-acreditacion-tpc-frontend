import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-covid',
  templateUrl: './formulario-covid.component.html',
  styleUrls: ['./formulario-covid.component.scss']
})
export class FormularioCovidComponent implements OnInit {

  formularioCovidForm!: FormGroup;
  empresas = [
    'TPC',
    'Ultraport',
    'Belfi',
    'CSH',
    'Teck',
    'AHK',
    'Contratistas',
    'Otro',
  ]

  sintomas = [
    'Fiebre, esto es, presentar una temperatura corporal de 37,8 °C o más.',
    'Tos.',
    'Disnea o dificultad respiratoria.',
    'Congestión nasal.',
    'Taquipnea o aumento de la frecuencia respiratoria.',
    'Odinofagia o dolor de garganta al comer o tragar fluidos.',
    'Mialgias o dolores musculares.',
    'Debilidad general o fatiga.',
    'Dolor torácico.',
    'Calofríos.',
    'Cefalea o dolor de cabeza.',
    'Diarrea.',
    'Anorexia o náuseas o vómitos.',
    'Pérdida brusca y completa del olfato (anosmia).',
    'Pérdida brusca y completa del gusto (ageusia).',
  ];
  isLoading: boolean = false;
  sintomasDisabled: boolean = false;
  constructor(public formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.formularioCovidForm = this.createFormularioCovidForm();
  }

  guardarFormulario() {
    let req = this.formularioCovidForm.value;
    req.sintomas = JSON.stringify(this.formularioCovidForm.get('sintomas')?.value.toString());
    req.haTenidoContactoEstrecho = JSON.parse(req.haTenidoContactoEstrecho);
    req.haTenidoSintomas = JSON.parse(req.haTenidoSintomas);
    this.isLoading = true;
    this.api.POST('/registro-covid-formulario', this.formularioCovidForm.value)
      .then(res => {
        this.isLoading = false;
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Se ha registrado correctamente el formulario',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.formularioCovidForm.reset();
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'Ha ocurrido un error al registrar el formulario',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
        console.log(err);
      });
  }

  onChangeHaTenidoSintomas() {
    console.log(typeof this.formularioCovidForm.get('haTenidoSintomas')?.value);

    const sintomas = <FormControl>this.formularioCovidForm.get('sintomas');
    if (this.formularioCovidForm.get('haTenidoSintomas')?.value == 'true') {
      console.log("enable");
      this.formularioCovidForm.controls['sintomas'].enable();
      sintomas.setValidators([Validators.required])
    }
    else if (this.formularioCovidForm.get('haTenidoSintomas')?.value == 'false') {
      // sintomas.setValidators(null);
      console.log("disable");
      this.formularioCovidForm.controls['sintomas'].disable();
    }
  }

  createFormularioCovidForm() {
    return this.formBuilder.group({
      nombre: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      apellido: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ])
      ),
      rut: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          TPCValidations.isRutInvalido,
        ])
      ),
      empresa: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      haTenidoSintomas: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      sintomas: new FormControl(
        { value: '', disabled: true },
        Validators.compose([Validators.required])
      ),
      haTenidoContactoEstrecho: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }



}
