import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-basico-action',
  templateUrl: './dialog-basico-action.component.html',
  styleUrls: ['./dialog-basico-action.component.scss']
})
export class DialogBasicoActionComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  callAction(): void {
    this.data.action();
  }

}
