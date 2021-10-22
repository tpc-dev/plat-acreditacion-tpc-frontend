import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PreguntaInduccion } from 'src/app/core/interfaces/preguntainduccion.interface';
@Component({
  selector: 'app-input-test-riesgo',
  templateUrl: './input-test-riesgo.component.html',
  styleUrls: ['./input-test-riesgo.component.scss']
})
export class InputTestRiesgoComponent implements OnInit {
  @Input() pregunta!: PreguntaInduccion
  alternativaSelected: any;
  constructor() {
  }

  ngOnInit(): void {
    // console.log(this.pregunta)
  }

  onChangeAlternativa() {
    console.log(this.alternativaSelected)
  }

}
