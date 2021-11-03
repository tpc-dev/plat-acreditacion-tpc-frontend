
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export class TPCValidations {

    static isRutInvalido(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        console.log(value)
        if (!value) {
            return null;
        }

        // verificar si un string tienen un - 
        if (value.indexOf('-') == -1)
            return { rutValido: true };

        var tmp = value.split('-');
        var digv = tmp[1];
        var rut = tmp[0];
        if (digv == 'K') digv = 'k';


        var M = 0,
            S = 1;
        for (; rut; rut = Math.floor(rut / 10)) {
            S = (S + (rut % 10) * (9 - (M++ % 6))) % 11;
        }
        const digitoVerificador = S ? S - 1 : 'k';
        const response = digitoVerificador == digv ? null : { rutValido: true };
        return response;
    }
}

