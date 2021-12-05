import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemCarpetaArranque } from 'src/app/core/interfaces/itemcarpetaarranque.interface';
import { ApiService } from 'src/app/core/services/api/api.service';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-item-carpeta-arranque-admin',
  templateUrl: './item-carpeta-arranque-admin.component.html',
  styleUrls: ['./item-carpeta-arranque-admin.component.scss']
})
export class ItemCarpetaArranqueAdminComponent implements OnInit {

  elementosCarpetaArranque: ItemCarpetaArranque[] = []
  constructor(public apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.obtenerItemsCarpetaArranque();
  }

  obtenerItemsCarpetaArranque() {
    this.apiService.GET('/item-carpeta-arranque')
      .then((data) => {
        console.log(data);
        this.elementosCarpetaArranque = data;
      }
      ).catch((error) => {
        console.log(error);
      });
  }

  verDetallesElemento(elemento: ItemCarpetaArranque) {
    this.router.navigate(['item-carpeta-arranque-admin', elemento.id]);
  }

}
