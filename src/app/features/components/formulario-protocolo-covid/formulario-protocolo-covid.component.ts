import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistroCovidFormulario } from 'src/app/core/interfaces/registrocovidformulario.interface';
import { Visita } from 'src/app/core/interfaces/visita.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-protocolo-covid',
  templateUrl: './formulario-protocolo-covid.component.html',
  styleUrls: ['./formulario-protocolo-covid.component.scss']
})
export class FormularioProtocoloCovidComponent implements OnInit {
  temperatura!: number;
  encuestaCovidRespondida: boolean = false;
  consulting: boolean = false;
  registroCovidFormularioResp!: RegistroCovidFormulario;
  timeOutFormulario: any;
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
        this.consulting = false;
        if (data.code == '002') {
          this.encuestaCovidRespondida = false;
          return;
        }

        if (data.code == '003') {

          this.encuestaCovidRespondida = false;
          return;
        }

        this.registroCovidFormularioResp = data;
        console.log(this.registroCovidFormularioResp);

        this.encuestaCovidRespondida = true;

        if (this.registroCovidFormularioResp.haTenidoContactoEstrecho || this.registroCovidFormularioResp.haTenidoSintomas) {
          Swal.fire({
            title: 'ADVERTENCIA',
            text: 'Esta persona ha tenido sintomas COVID-19 y/o ha estado en contacto estrecho con alguien con COVID-19',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }

      })
      .catch(err => {
        this.consulting = false;
        console.log(err);
      }).finally(() => {
        this.consulting = false;
        if (!this.encuestaCovidRespondida) {
          this.timeOutFormulario = setTimeout(() => {
            this.obtenerEncuestaCovid()
          }, 2000);
        }
      });
  }

  ngOnDestroy() {
    clearTimeout(this.timeOutFormulario);
  }
  guardarIngresoProtocoloCOVID() {
    let req = {
      temperatura: this.temperatura,
      registroCovidFormularioId: this.registroCovidFormularioResp.id
    }

    console.log(req);


    this.api.POST('/registro-covid-accesos', req)
      .then(data => {
        this.dialogRef.close(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

}
