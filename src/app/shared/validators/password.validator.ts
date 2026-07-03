import { AbstractControl, ValidationErrors } from "@angular/forms";
import { VALIDATION_RULES } from '@core/constants/validation.const';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    if (control.value?.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
        return {
            minLength: {
                requiredLength: VALIDATION_RULES.PASSWORD.MIN_LENGTH,
                actualLength: control.value.length,
            },
        };
    }
    return null;
}