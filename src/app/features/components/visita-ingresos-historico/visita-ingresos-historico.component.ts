import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/services/api/api.service';
import { VisitaDetailComponent } from '../visita-detail/visita-detail/visita-detail.component';

@Component({
  selector: 'app-visita-ingresos-historico',
  templateUrl: './visita-ingresos-historico.component.html',
  styleUrls: ['./visita-ingresos-historico.component.scss']
})
export class VisitaIngresosHistoricoComponent implements OnInit {
  dataSourceHistoricos!: MatTableDataSource<any>;
  displayedColumns: string[] = ['tipo', 'fecha'];
  ultimoAcceso: any;
  isLoading = false;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public apiService: ApiService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.apiService.getAccesosHistoricosVisita(this.data.id).toPromise().then((data: any) => {
      this.dataSourceHistoricos = new MatTableDataSource(data);
      this.buscarUltimoAcceso(data);
    });
  }

  buscarUltimoAcceso(listaAccesos: any) {
    let listaOrdenada = listaAccesos.sort((a: any, b: any) => {
      if (a.fechaEvento > b.fechaEvento) { return 1; }
      if (a.fechaEvento < b.fechaEvento) { return -1; }
      return 0;
    });

    this.ultimoAcceso = listaOrdenada[listaOrdenada.length - 1];
    this.isLoading = false;
  }
}
