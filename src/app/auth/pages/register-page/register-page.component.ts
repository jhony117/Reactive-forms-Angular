import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/services/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

  public myForm: FormGroup =this.fb.group ({

    name : ['', [Validators.required , Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // email : ['',  [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidator()]], //? esta es mas limpia
    email : ['',  [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]], //? pero esta es mejor en el caso de haber muchas inicializaciones
    username: ['', [Validators.required, this.validatorsService.canBeStrider]],
    password: ['', [Validators.required , Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  })

  constructor (private fb: FormBuilder,
    private  validatorsService:ValidatorsService ,
    private emailValidator:EmailValidator){}

   isValidField(field:string){
    return this.validatorsService.isValidField(this.myForm, field)
   }

  onSubmit(){
    this.myForm.markAllAsTouched();
  }

}
