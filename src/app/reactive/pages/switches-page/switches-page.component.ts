import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit {

public myForm:FormGroup = this.fb.group({
  gender: ['M', Validators.required],
  wantNotifications: [true, Validators.required],
  termsAndConditions : [false, Validators.requiredTrue ]
});


public person = {
  gender : 'F',
  wantNotifications:false
}

constructor (private fb:FormBuilder,
  private validatorsService:ValidatorsService
  ) {}


  ngOnInit(): void {

this.myForm.reset(this.person)
  }

//ngSubmit
  onSave() {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    const  { termsAndConditions, ...newPerson } = this.myForm.value;

   this.person =  newPerson;
   console.log(this.myForm.value);
   console.log(this.person);

this.myForm.reset();
}

isValidField(field:string){
  return this.validatorsService.isValidField(this.myForm, field)
 }


  isValidTermsAndConditions():boolean {
if(this.myForm.controls['termsAndConditions'].touched === false) return false;
return this.myForm.controls['termsAndConditions'].invalid;
  }




}
