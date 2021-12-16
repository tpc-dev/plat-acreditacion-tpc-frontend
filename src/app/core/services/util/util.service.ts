import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogBasicoActionComponent } from 'src/app/features/components/dialog-basico-action/dialog-basico-action.component';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(public _snackBar: MatSnackBar, public dialog: MatDialog) { }

  openSnackBar(message: string, duration: number) {
    this._snackBar.open(message, '', { duration: duration });
  }

  openDialogBasicAction(action: any, title: string, message: string, button: string, buttonAction: any) {
    const dialogRef = this.dialog.open(DialogBasicoActionComponent, {
      width: '650px',
      data: { action, title, message, button, buttonAction }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
    });
  }

  validateRut(rutCompleto: string): boolean {
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    return this.digitoVerificador(rut) == digv;
  }

  digitoVerificador(rut: any) {
    var M = 0,
      S = 1;
    for (; rut; rut = Math.floor(rut / 10)) {
      S = (S + (rut % 10) * (9 - (M++ % 6))) % 11;
    }
    return S ? S - 1 : 'k';
  }

}
