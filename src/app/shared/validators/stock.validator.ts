import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Valida que el stock sea un número entero positivo
 */
export function stockValido(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    // Verificar que sea un número entero
    if (!Number.isInteger(Number(value))) {
      return {
        stockNoEntero: {
          value,
          message: 'El stock debe ser un número entero'
        }
      };
    }

    // Verificar que sea positivo
    if (value < 0) {
      return {
        stockNegativo: {
          value,
          message: 'El stock no puede ser negativo'
        }
      };
    }

    return null;
  };
}

/**
 * Valida que el stock esté por encima del mínimo
 */
export function stockMinimo(minimo: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (value < minimo) {
      return {
        stockBajo: {
          value,
          minimo,
          message: `El stock debe ser al menos ${minimo}`
        }
      };
    }

    return null;
  };
}

/**
 * Valida que el stock no exceda el máximo
 */
export function stockMaximo(maximo: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (value === null || value === undefined || value === '') {
      return null;
    }

    if (value > maximo) {
      return {
        stockExcedido: {
          value,
          maximo,
          message: `El stock no puede exceder ${maximo}`
        }
      };
    }

    return null;
  };
}
