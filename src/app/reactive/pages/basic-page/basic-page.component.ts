import { Component, OnInit } from '@angular/core';
import { FormBuilder,   FormGroup, Validators } from '@angular/forms';

 const rtx7090 = {
  name: 'RTX 7090',
  price : 2500,
  inStorage : 7
 }

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{


  // public myForm: FormGroup = new FormGroup({
  //? FormControl('validacion inicial', [validaciones sincronos], [validaciones asincronas])
  //     name : new FormControl('', [], []),
  //     price : new FormControl('', [], []),
  //     inStorage : new FormControl('', [], []),
  // });


  public myForm :FormGroup = this.fb.group({
    name : ['', [ Validators.required, Validators.minLength(3) ] ],
    price :[0, [Validators.required, Validators.min(0)]],
    inStorage : [0 , [Validators.required, Validators.min(0)]]
  })


constructor (private fb:FormBuilder){}

  ngOnInit(): void {
      this.myForm.reset(rtx7090)

  }

  isValidField(field : string):boolean | null {
    return this.myForm.controls[field].errors
                    &&
    this.myForm.controls[field].touched
  }

  getFieldError(field:string):string | null{

      if(!this.myForm.controls[field]) return null;

      const errors = this.myForm.controls[field].errors || {};

      for (const key of Object.keys(errors)) {
          switch( key ) {
            case 'required' :
              return 'este campo es requirido';

            case 'minlength':
              return `Minimo ${errors['minlength'].requiredLength} caracteres`;
          }
      }
      return null;
  }

onSave():void {

  if(this.myForm.invalid) {

    this.myForm.markAllAsTouched();
    return ;}
  console.log(this.myForm.value);


  //? reset reinicia completamentr un formulario,
        //? miestras que set value simplememte le da un valor a los inputs
  this.myForm.reset({ price : 0, inStorage : 0});




}

}
