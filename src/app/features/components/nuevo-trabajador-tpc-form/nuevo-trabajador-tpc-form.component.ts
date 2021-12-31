import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Empresa } from 'src/app/core/interfaces/empresa.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-trabajador-tpc-form',
  templateUrl: './nuevo-trabajador-tpc-form.component.html',
  styleUrls: ['./nuevo-trabajador-tpc-form.component.scss']
})
export class NuevoTrabajadorTpcFormComponent implements OnInit {
  nuevoTrabajadorForm: FormGroup;
  listGeneros: any[] = [];
  listaEmpresas: Empresa[] = [];
  isLoading = false;
  constructor(public formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.obtenerGeneros();
    this.obtenerListaEmpresas();
    this.nuevoTrabajadorForm = this.createFormGroup();
  }

  obtenerListaEmpresas() {
    this.api.GET("/empresas").then((empresas: Empresa[]) => {
      this.listaEmpresas = empresas;
    }).catch(error => {
      console.log(error);
    });
  }

  obtenerGeneros() {
    this.api.GET(`/generos/activos`)
      .then(res => {
        this.listGeneros = res;
        console.log(res);
      })
      .catch(err => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener los generos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.log(err);
      });
  }

  createFormGroup() {
    return this.formBuilder.group({
      rut: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          TPCValidations.isRutInvalido,
        ])
      ),
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      generoId: ['', Validators.required],
      empresaId: ['', Validators.required],
    });
  }

  guardarNuevoTrabajador() {
  }

}
