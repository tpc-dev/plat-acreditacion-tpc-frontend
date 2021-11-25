import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';

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
  constructor(public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formularioCovidForm = this.createFormularioCovidForm();
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
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      haTenidoContacto: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }

  guardarFormulario(){
    // TODO guardar formulario
  }

}
