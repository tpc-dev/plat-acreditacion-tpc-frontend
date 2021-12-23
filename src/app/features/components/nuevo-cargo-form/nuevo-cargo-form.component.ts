import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-cargo-form',
  templateUrl: './nuevo-cargo-form.component.html',
  styleUrls: ['./nuevo-cargo-form.component.scss']
})
export class NuevoCargoFormComponent implements OnInit {

  @Input() contratoId: number;
  @Output() onNuevoCargoAdded = new EventEmitter();
  nuevoCargoForm: FormGroup
  isLoading: boolean = false;
  constructor(public formbuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.nuevoCargoForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.formbuilder.group({
      nombre: ['', Validators.required],
      activo: [true]
    });
  }

  crearCargo() {
    this.isLoading = true;
    let req = {
      Nombre: this.nuevoCargoForm.get('nombre')?.value,
      Activo: this.nuevoCargoForm.get('activo')?.value,
      ContratoId: this.contratoId
    }
    this.api.POST(`/contratos/${this.contratoId}/cargos`, req)
      .then(res => {
        this.onNuevoCargoAdded.emit(res);
        this.nuevoCargoForm.reset();
        Swal.fire({
          title: 'Cargo creado',
          text: 'El cargo se ha creado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        Swal.fire({
          title: 'Error',
          text: 'No se pudo crear el cargo',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });
  }

  recargarCargos() {
    this.onNuevoCargoAdded.emit();
  }


}
