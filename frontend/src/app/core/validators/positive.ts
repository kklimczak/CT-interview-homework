import { AbstractControl, ValidationErrors } from '@angular/forms';

export function positive() {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log(control.value);
    if (control.value <= 0) {
      return { positive: true };
    }

    return null;
  };
}
