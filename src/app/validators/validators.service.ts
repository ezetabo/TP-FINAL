import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public namePattern: string = '([a-zA-Z ]+)';
  public numberPattern: string = '^[0-9]+$';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}";
  public dniPattern: string = '^[0-9]{6,9}$';


  constructor() { }

  public isValidField(form: FormGroup, field: string): boolean | null {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isValidType(allowedTypes: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && allowedTypes.findIndex(type => type.toLowerCase() === value.toLowerCase()) === -1) {
        return { 'tipoInvalido': { value: control.value } };
      }
      return null;
    };
  }


  public isInvalidType(forbiddenTypes: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && forbiddenTypes.some(type => type.toLowerCase() === value.toLowerCase())) {
        return { 'tipoInvalido': { value: control.value } };
      }
      return null;
    };
  }




  public integerValidator(): Validators {
    return Validators.pattern(this.numberPattern);
  }


  public dniValidator(): Validators {
    return Validators.pattern(this.dniPattern);
  }
}
