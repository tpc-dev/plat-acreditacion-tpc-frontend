import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/core/interfaces/cuenta.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-maintpc',
  templateUrl: './maintpc-page.component.html',
  styleUrls: ['./maintpc-page.component.scss']
})
export class MaintpcPageComponent implements OnInit {
  showFiller: boolean = false;
  usuario: Usuario;
  constructor(public auth: AuthService) {
    this.usuario = this.auth.getCuentaActivaValue().usuario;
  }

  ngOnInit(): void {
  }

}
