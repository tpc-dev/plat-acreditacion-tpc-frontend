import { Component, OnInit } from '@angular/core';
import { PreguntaInduccion } from 'src/app/core/interfaces/preguntainduccion.interface';

@Component({
  selector: 'app-formulario-test-riesgo',
  templateUrl: './formulario-test-riesgo.component.html',
  styleUrls: ['./formulario-test-riesgo.component.scss']
})
export class FormularioTestRiesgoComponent implements OnInit {
  preguntasInduccion: Array<PreguntaInduccion> = [
    {
      id: 1,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }, {
      id: 2,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }, {
      id: 3,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }, {
      id: 4,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }, {
      id: 5,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }, {
      id: 6,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }, {
      id: 7,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }, {
      id: 8,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }, {
      id: 9,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }, {
      id: 10,
      pregunta: '¿Que eventos son cubiertos por la ley 16.744?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Accidente 1'
        },
        {
          id: 'b',
          nombre: 'Accidente 1'
        },
        {
          id: 'c',
          nombre: 'Accidente 1'
        },
        {
          id: 'd',
          nombre: 'Accidente 1'
        },
      ]
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
