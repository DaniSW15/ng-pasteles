import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Valida que el precio sea positivo (mayor a 0)
 */
export function precioPositivo(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null; // No validar si está vacío (usa Validators.required para eso)
    }

    if (value <= 0) {
      return { precioNegativo: { value, message: 'El precio debe ser mayor a 0' } };
    }

    return null;
  };
}

/**
 * Valida que el precio esté dentro de un rango
 */
export function precioEnRango(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (value < min || value > max) {
      return {
        precioFueraDeRango: {
          value,
          min,
          max,
          message: `El precio debe estar entre $${min} y $${max}`
        }
      };
    }

    return null;
  };
}

/**
 * Valida que el precio tenga máximo 2 decimales
 */
export function precioDecimales(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    const decimales = value.toString().split('.')[1];
    if (decimales && decimales.length > 2) {
      return {
        precioDecimales: {
          value,
          message: 'El precio solo puede tener 2 decimales'
        }
      };
    }

    return null;
  };
}
