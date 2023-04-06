import { Directive } from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Directive({
  selector: '[koolaConfirmPassword]'
})
export class ConfirmPasswordDirective {

  static MatchPassword(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('confirm').value; // to get value in input tag
     if(password != confirmPassword) {
         AC.get('confirm').setErrors( {MatchPassword: true} )
     } else {
         return null
     }
 }

}
