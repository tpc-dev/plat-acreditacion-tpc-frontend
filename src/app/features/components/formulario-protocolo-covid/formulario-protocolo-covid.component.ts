import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-formulario-protocolo-covid',
  templateUrl: './formulario-protocolo-covid.component.html',
  styleUrls: ['./formulario-protocolo-covid.component.scss']
})
export class FormularioProtocoloCovidComponent implements OnInit {
  temperatura!: number;
  encuestaCovidRespondida: boolean = false;
  consulting: boolean = false;
  constructor(public dialogRef: MatDialogRef<Visita>,
    @Inject(MAT_DIALOG_DATA) public visita: Visita, public api: ApiService) { }

  ngOnInit(): void {
    console.log(this.visita);
    this.obtenerEncuestaCovid();
  }

  obtenerEncuestaCovid() {
    this.consulting = true;
    this.api.GET(`/registro-covid-formulario/ultimo-contestado/${this.visita.rut}`)
      .then(data => {
        console.log(data);
        this.consulting = false;
        if (data.code == '002') {
          this.encuestaCovidRespondida = false;
          return;
        }

        this.encuestaCovidRespondida = true;
        // if (data.length > 0) {
        //   this.encuestaCovidRespondida = true;
        // }
      })
      .catch(err => {
        this.consulting = false;
        console.log(err);
      }).finally(() => {
        this.consulting = false;
        if (!this.encuestaCovidRespondida) {
          setTimeout(() => {
            this.obtenerEncuestaCovid()
          }, 2000);
        }
      });
  }




}
