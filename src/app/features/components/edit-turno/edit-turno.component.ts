import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-edit-turno',
  templateUrl: './edit-turno.component.html',
  styleUrls: ['./edit-turno.component.scss']
})
export class EditTurnoComponent implements OnInit {
  turno: any;
  nuevoTurnoForm: FormGroup;
  listJornadas: any[] = [];
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public formbuilder: FormBuilder, public api: ApiService, public dialog: MatDialog,
    public router: Router) {
    console.log(data);
    this.turno = data.turno;
  }

  ngOnInit(): void {
    this.obtenerJornadasParaEsteTurno();
    this.nuevoTurnoForm = this.createForm();
  }

  obtenerJornadasParaEsteTurno() {
    this.api.GET(`/contratos/${this.turno.contratoId}/jornadas`)
      .then(res => {
        this.listJornadas = res;
      })
      .catch(err => {
        console.log(err);
      });
  }


  createForm(): FormGroup {
    return this.formbuilder.group({
      fechaInicio: [this.turno.fechaInicio, Validators.required],
      fechaTermino: [this.turno.fechaTermino, Validators.required],
      diasLaborales: [this.turno.diasLaborales, Validators.required],
      diasFestivos: [this.turno.diasFestivos, Validators.required],
      descripcion: [this.turno.descripcion, Validators.required],
      horasSemana: [this.turno.horasSemana, Validators.required],
      jornadaId: [this.turno.jornadaId, Validators.required],
      activo: [this.turno.activo]
    });
  }

  guardarCambios() {
  }

}
