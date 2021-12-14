import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-gerencias-admin',
  templateUrl: './gerencias-admin.component.html',
  styleUrls: ['./gerencias-admin.component.scss']
})
export class GerenciasAdminComponent implements OnInit {

  isLoading = false;
  listaGerencias: any[] = []
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerGerencias();
  }

  obtenerGerencias() {
    this.isLoading = true;
    this.apiService.GET('/gerencias')
      .then(res => {
        this.listaGerencias = res;
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
}
