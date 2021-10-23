import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreguntaInduccion } from 'src/app/core/interfaces/preguntainduccion.interface';
export interface DialogData {
  titulo: string;
  mensaje: string;
  tipo: string
}
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
          nombre: 'Accidente de Trabajo'
        },
        {
          id: 'b',
          nombre: 'Accidente de Trayecto'
        },
        {
          id: 'c',
          nombre: 'Enfermedades Profesional'
        },
        {
          id: 'd',
          nombre: 'Todas las anteriores'
        },
      ]
    }, {
      id: 2,
      pregunta: 'Encierre en un círculo las áreas Operacionales a los que usted está expuesto',
      alternativas: [
        {
          id: 'a',
          nombre: 'Área de Almacenamiento Masivo'
        },
        {
          id: 'b',
          nombre: 'Área de Almacenamiento Intermedio'
        },
        {
          id: 'c',
          nombre: 'Área de Proyectos'
        },
        {
          id: 'd',
          nombre: 'Todas las anteriores'
        },
      ]
    }, {
      id: 3,
      pregunta: 'El Código ISPS indica que está prohibido lo siguiente',
      alternativas: [
        {
          id: 'a',
          nombre: 'Alcohol'
        },
        {
          id: 'b',
          nombre: 'Drogas'
        },
        {
          id: 'c',
          nombre: 'Contrabando'
        },
        {
          id: 'd',
          nombre: 'Armas y Contrabandos'
        },
        {
          id: 'e',
          nombre: 'Todas las anteriores'
        }
      ]
    }, {
      id: 4,
      pregunta: 'En caso de tener que evacuar el Puerto, cual es nuestro punto de encuentro',
      alternativas: [
        {
          id: 'a',
          nombre: "Calle O'Higgins a 30 metros sobre el mar"
        },
        {
          id: 'b',
          nombre: "Calle O'Higgins a 50 metros sobre el mar"
        },
        {
          id: 'c',
          nombre: "Calle O'Higgins a 20 metros sobre el mar"
        },
      ]
    }, {
      id: 5,
      pregunta: 'En caso de accidente en mi trabajo que debo hacer?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Debo ir al hospital de forma inmediata'
        },
        {
          id: 'b',
          nombre: 'Debo solicitar permiso al guardia para salir y dirigirme al hospital'
        },
        {
          id: 'c',
          nombre: 'Debo dar aviso a mi jefe directo'
        },
        {
          id: 'd',
          nombre: 'No le aviso a nadie y me voy'
        },
      ]
    }, {
      id: 6,
      pregunta: 'Lo que siempre debemos hacer al momento de estar dentro del Puerto',
      alternativas: [
        {
          id: 'a',
          nombre: 'Transitar a pie donde yo desee'
        },
        {
          id: 'b',
          nombre: 'Transitar corriendo'
        },
        {
          id: 'c',
          nombre: `Si se debe transitar a pie debo hacerlo por las vías permitidas y marcadas como zona de tránsito peatonal,\n
          siempre pegado a su derecha y asegurándose que el el conductor del vehículo lo vea.`
        },
        {
          id: 'd',
          nombre: 'Todas las anteriores'
        },
      ]
    }, {
      id: 7,
      pregunta: 'Cuáles son los riesgos críticos a los que te verás expuestos dentro del puerto (estándar 4A+C)?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Atrapamiento'
        },
        {
          id: 'b',
          nombre: 'Contacto con energía'
        },
        {
          id: 'c',
          nombre: 'Altura física'
        },
        {
          id: 'd',
          nombre: 'Aplastamiento y atropello'
        },
        {
          id: 'e',
          nombre: 'Todas las anteriores'
        },
      ]
    }, {
      id: 8,
      pregunta: 'Los métodos de control a utilizar para evitar accidentes son:',
      alternativas: [
        {
          id: 'a',
          nombre: 'Uso de EPP'
        },
        {
          id: 'b',
          nombre: 'Aseo y orde de trabajo'
        },
        {
          id: 'c',
          nombre: 'Charla de instrucción de trabajo'
        },
        {
          id: 'd',
          nombre: 'Estar atento a las condiciones de entorno'
        },
        {
          id: 'e',
          nombre: 'Todas las anteriores'
        },
      ]
    }, {
      id: 9,
      pregunta: 'Como conductor que debo tomar en cuenta',
      alternativas: [
        {
          id: 'a',
          nombre: 'No superar los 20 KM/H de velocidad'
        },
        {
          id: 'b',
          nombre: 'No hablar por el celular'
        },
        {
          id: 'c',
          nombre: 'Siempre utilizar cinturón de seguridad'
        },
        {
          id: 'd',
          nombre: 'Usar la baliza de emergencia a interior de Puerto'
        },
        {
          id: 'e',
          nombre: 'Todas las anteriores'
        }
      ]
    }, {
      id: 10,
      pregunta: '¿Que elementos de protección personal(EPP) debo tener al ingresar y estar dentro del puerto?',
      alternativas: [
        {
          id: 'a',
          nombre: 'Casco de seguirdad y chaleco reflectante'
        },
        {
          id: 'b',
          nombre: 'Lentes de seguirdad'
        },
        {
          id: 'c',
          nombre: 'Calzado de seguirdad'
        },
        {
          id: 'd',
          nombre: 'Todas las anteriores'
        },
      ]
    }
  ]

  respuestasEval = [
    // lista de preguntas y respuestas largo 10
    { pregunta: 1, alternativa: 'd' },
    { pregunta: 2, alternativa: 'd' },
    { pregunta: 3, alternativa: 'e' },
    { pregunta: 4, alternativa: 'b' },
    { pregunta: 5, alternativa: 'c' },
    { pregunta: 6, alternativa: 'c' },
    { pregunta: 7, alternativa: 'e' },
    { pregunta: 8, alternativa: 'e' },
    { pregunta: 9, alternativa: 'e' },
    { pregunta: 10, alternativa: 'd' },
  ];

  alternativasSeleccionadas: any[] = []; // Guarda las alternativas seleccionadas
  dialogRef: any;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onAlternativaSelecccionada(eventData: { pregunta: number, alternativa: string }) {
    // verificar si se ya existe la pregunta en el array
    const preguntaExiste = this.alternativasSeleccionadas.find(pregunta => pregunta.pregunta === eventData.pregunta);
    if (preguntaExiste) {
      // si existe, reemplazar la alternativa
      const index = this.alternativasSeleccionadas.findIndex(pregunta => pregunta.pregunta === eventData.pregunta);
      this.alternativasSeleccionadas[index].alternativa = eventData.alternativa;
    } else {
      this.alternativasSeleccionadas.push(eventData);
    }

    // si ya selecciono todas las preguntas, mostrar el resultado
    if (this.alternativasSeleccionadas.length === this.preguntasInduccion.length) {
      this.evaluarResultado();
    }
    console.log(this.alternativasSeleccionadas)
  }

  evaluarResultado() {
    // verificar si las respuestas son correctas 
    let correctas = 0;
    this.alternativasSeleccionadas.forEach(respuesta => {
      const pregunta = this.respuestasEval.find(respuestasEval => respuestasEval.pregunta === respuesta.pregunta);
      if (pregunta?.alternativa[0] === respuesta.alternativa) {
        correctas++;
      }
    });
    console.log(correctas)
    // si todas son correctas mostrar dialog con mensaje de felicitaciones
    if (correctas === this.preguntasInduccion.length) {
      this.mostrarMensaje('Felicitaciones', 'Has aprobado el curso de inducción');
    } else {
      // si no mostrar mensaje de error
      this.mostrarMensaje('Error', 'Has reprobado el curso de inducción');
    }
  }

  mostrarMensaje(titulo: string, mensaje: string) {
    this.dialog.open(MensajeComponent, {
      data: {
        titulo,
        mensaje,
        tipo: 'success'
      }
    });
  }
}




@Component({
  selector: 'dialog-basic',
  templateUrl: 'dialog_basic.html',
})
export class MensajeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}

