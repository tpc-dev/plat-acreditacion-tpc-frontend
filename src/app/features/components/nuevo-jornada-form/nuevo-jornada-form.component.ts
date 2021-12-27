import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-jornada-form',
  templateUrl: './nuevo-jornada-form.component.html',
  styleUrls: ['./nuevo-jornada-form.component.scss']
})
export class NuevoJornadaFormComponent implements OnInit {

  nuevaJornadaForm: FormGroup;
  contratoId: number;
  isLoading: boolean = false;
  constructor(public activeRoute: ActivatedRoute, public formBuilder: FormBuilder, public api: ApiService,public router: Router) {
    this.activeRoute.params.subscribe((params: any) => {
      console.log(params);
      this.contratoId = params.id;
    });
  }

  ngOnInit(): void {
    this.nuevaJornadaForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaTermino: ['', Validators.required],
      activo: [true]
    });
  }

  guardarJornada() {
    let req = {
      Nombre: this.nuevaJornadaForm.get('nombre')?.value,
      FechaInicio: this.nuevaJornadaForm.get('fechaInicio')?.value.toISOString(),
      HoraInicio: this.nuevaJornadaForm.get('horaInicio')?.value,
      HoraTermino: this.nuevaJornadaForm.get('horaTermino')?.value,
      Activo: this.nuevaJornadaForm.get('activo')?.value,
      ContratoId: this.contratoId
    }

    console.log(req);
    this.isLoading = true;
    this.api.POST(`/contratos/${this.contratoId}/jornadas`, req)
      .then(res => {
        this.isLoading = false;
        console.log(res);
        Swal.fire({
          title: 'Jornada creada',
          text: 'La jornada se ha creado correctamente',
          icon: 'success'
        });
        this.router.navigate(['../'], { relativeTo: this.activeRoute });
      })
      .catch(err => {
        this.isLoading = false;
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear la jornada',
          icon: 'error'
        });
      });
  }
}

