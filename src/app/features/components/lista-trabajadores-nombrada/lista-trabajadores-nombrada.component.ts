import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-lista-trabajadores-nombrada',
  templateUrl: './lista-trabajadores-nombrada.component.html',
  styleUrls: ['./lista-trabajadores-nombrada.component.scss']
})
export class ListaTrabajadoresNombradaComponent implements OnInit {

  isLoading: boolean = false;
  listTrabajadores: any[] = [];
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public api: ApiService) {
    console.log(data.nombrada);
  }

  ngOnInit(): void {
    this.obtenerTrabajadores();
  }

  obtenerTrabajadores(): void {
    this.isLoading = true;
    this.api.GET(`/nombrada-diaria/${this.data.nombrada.id}/trabajadores`)
      .then(data => {
        this.isLoading = false;
        console.log(data);
        this.listTrabajadores = data;
      })
      .catch(err => {
        this.isLoading = false;
      });
  }

}
