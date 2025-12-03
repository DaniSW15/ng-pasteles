import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Valida formato de email más estricto que el de Angular
 */
export function emailEstricto(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    // Regex más estricto para email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) {
      return {
        emailInvalido: {
          value,
          message: 'Email inválido'
        }
      };
    }

    return null;
  };
}

/**
 * Valida que el email pertenezca a un dominio específico
 */
export function emailDominio(dominios: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const domain = value.split('@')[1];

    if (!dominios.includes(domain)) {
      return {
        emailDominioInvalido: {
          value,
          dominiosPermitidos: dominios,
          message: `El email debe ser de: ${dominios.join(', ')}`
        }
      };
    }

    return null;
  };
}

/**
 * Valida que el email no esté en una lista negra
 */
export function emailNoPermitido(emailsProhibidos: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toLowerCase();

    if (!value) {
      return null;
    }

    if (emailsProhibidos.map(e => e.toLowerCase()).includes(value)) {
      return {
        emailProhibido: {
          value,
          message: 'Este email no está permitido'
        }
      };
    }

    return null;
  };
}
