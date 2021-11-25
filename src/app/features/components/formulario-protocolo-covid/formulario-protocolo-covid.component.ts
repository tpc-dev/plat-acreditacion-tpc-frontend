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

  constructor(public dialogRef: MatDialogRef<Visita>,
    @Inject(MAT_DIALOG_DATA) public visita: Visita, public apiService: ApiService) { }

  ngOnInit(): void {
    console.log(this.visita);
    this.obtenerEncuestaCovid(this.visita.rut);
  }

  obtenerEncuestaCovid(rut: string) {
    this.apiService.GET(`/encuesta-covid/${rut}`)
      .then(data => {
        console.log(data);
        if (data.length > 0) {
          this.encuestaCovidRespondida = true;
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

}
