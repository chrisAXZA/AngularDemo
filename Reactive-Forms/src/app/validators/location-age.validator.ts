import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const locationAgeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null{
    const age = control.get('age')?.value;
    const location = control.get('address.state')?.value;

    return age < 18 && (location as string)?.toLowerCase() === 'KABALA'.toLowerCase()
        ? {
            locationAge: {
                age: age,
                location: location,
            },
        }
        : null;
};