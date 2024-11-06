import { FormControl, ValidationErrors } from "@angular/forms";

export class KalorisizKodValidators {

    static notOnlyWhitespace(control: FormControl): ValidationErrors | undefined{

        if((control.value != null) && (control.value.trim().length === 0)){
            return {'notOnlyWhitespace': true};
        }else {
            return undefined;
        }
    }
}
