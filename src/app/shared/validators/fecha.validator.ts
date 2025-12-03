import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Valida que la fecha sea futura
 */
export function fechaFutura(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Resetear horas para comparar solo fechas

    if (inputDate < today) {
      return {
        fechaPasada: {
          value,
          message: 'La fecha debe ser futura'
        }
      };
    }

    return null;
  };
}

/**
 * Valida que la fecha sea pasada
 */
export function fechaPasada(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const inputDate = new Date(value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (inputDate > today) {
      return {
        fechaFutura: {
          value,
          message: 'La fecha debe ser pasada'
        }
      };
    }

    return null;
  };
}

/**
 * Valida que la fecha esté dentro de un rango
 */
export function fechaEnRango(minDate: Date, maxDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const inputDate = new Date(value);

    if (inputDate < minDate || inputDate > maxDate) {
      return {
        fechaFueraDeRango: {
          value,
          minDate,
          maxDate,
          message: `La fecha debe estar entre ${minDate.toLocaleDateString()} y ${maxDate.toLocaleDateString()}`
        }
      };
    }

    return null;
  };
}

/**
 * Valida edad mínima (para fecha de nacimiento)
 */
export function edadMinima(edad: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ? age - 1
      : age;

    if (actualAge < edad) {
      return {
        edadMinima: {
          value,
          edadRequerida: edad,
          edadActual: actualAge,
          message: `Debe tener al menos ${edad} años`
        }
      };
    }

    return null;
  };
}
