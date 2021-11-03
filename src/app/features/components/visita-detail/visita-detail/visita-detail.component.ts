import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Visita } from 'src/app/core/interfaces/visita.interface';

@Component({
  selector: 'app-visita-detail',
  templateUrl: './visita-detail.component.html',
  styleUrls: ['./visita-detail.component.scss']
})
export class VisitaDetailComponent implements OnInit {
  minDate: Date;
  constructor(
    public dialogRef: MatDialogRef<VisitaDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Visita) {
    this.minDate = moment().toDate();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
