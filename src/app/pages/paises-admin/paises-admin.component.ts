import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-paises-admin',
  templateUrl: './paises-admin.component.html',
  styleUrls: ['./paises-admin.component.scss']
})
export class PaisesAdminComponent implements OnInit {

  isLoading = false;
  listaPaises: any[] = []
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerPaises();
  }

  obtenerPaises() {
    this.isLoading = true;
    this.apiService.GET('/paises')
      .then(res => {
        this.listaPaises = res;
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
