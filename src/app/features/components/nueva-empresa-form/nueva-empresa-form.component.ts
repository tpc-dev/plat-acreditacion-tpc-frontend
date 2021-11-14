import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api/api.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { TPCValidations } from 'src/app/core/utils/TPCValidations';

@Component({
  selector: 'app-nueva-empresa-form',
  templateUrl: './nueva-empresa-form.component.html',
  styleUrls: ['./nueva-empresa-form.component.scss']
})
export class NuevaEmpresaFormComponent implements OnInit {
  nuevaEmpresaForm!: FormGroup;
  isLoadingNew = false;
  @Output() onNuevaEmpresaAgregada = new EventEmitter();
  usuarioId!: number | undefined;
  constructor(public api: ApiService, public formBuilder: FormBuilder, public utilService: UtilService,
    public authService: AuthService) { }

  ngOnInit(): void {
    this.nuevaEmpresaForm = this.createNuevaEmpresaForm();
  }

  obtenerEstadosAcreditacion() {
    
  }

  createNuevaEmpresaForm() {
    return this.formBuilder.group({
      rut: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      razonsocial: new FormControl(
        null,
        Validators.compose([
          Validators.required,
        ])
      ),
      // rut: new FormControl(
      //   null,
      //   Validators.compose([
      //     Validators.required,
      //     TPCValidations.isRutInvalido,
      //   ])
      // ),
      estadoacreditacionid: new FormControl(
        1,
        Validators.compose([
          Validators.required,
        ])
      ),
    });
  }
}
