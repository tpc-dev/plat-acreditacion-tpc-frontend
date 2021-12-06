import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-areas-admin',
  templateUrl: './areas-admin.component.html',
  styleUrls: ['./areas-admin.component.scss']
})
export class AreasAdminComponent implements OnInit {

  isLoading = false;
  listaAreas: any[] = []
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.obtenerAreas();
  }

  obtenerAreas() {
    this.isLoading = true;
    this.apiService.GET('/areas')
      .then(res => {
        this.listaAreas = res;
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
