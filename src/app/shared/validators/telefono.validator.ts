import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Valida formato de teléfono (10 dígitos)
 * Ejemplos válidos: 5551234567, 1234567890
 */
export function telefonoMexicano(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Remover espacios, guiones y paréntesis
    const cleaned = value.replace(/[\s\-\(\)]/g, '');

    // Validar que sean exactamente 10 dígitos
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(cleaned)) {
      return {
        telefonoInvalido: {
          value,
          message: 'El teléfono debe tener 10 dígitos'
        }
      };
    }

    return null;
  };
}

/**
 * Valida formato de teléfono con código de país
 * Ejemplos válidos: +525551234567, +1234567890
 */
export function telefonoInternacional(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Formato: +[código país][número]
    const phoneRegex = /^\+\d{1,3}\d{10}$/;

    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return {
        telefonoInternacionalInvalido: {
          value,
          message: 'Formato: +52 5551234567'
        }
      };
    }

    return null;
  };
}
