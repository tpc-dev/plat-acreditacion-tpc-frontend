import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/services/api/api.service';

@Component({
  selector: 'app-detail-tipo-doc-acreditacion',
  templateUrl: './detail-tipo-doc-acreditacion.component.html',
  styleUrls: ['./detail-tipo-doc-acreditacion.component.scss']
})
export class DetailTipoDocAcreditacionComponent implements OnInit {

  isEdit = false;
  tipoDocAcreditacion: any;
  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, public apiService: ApiService) { }

  ngOnInit(): void {
    this.isEdit = this.data != null;
    if (this.isEdit) {
      this.tipoDocAcreditacion = this.data;
    }
  }

}
