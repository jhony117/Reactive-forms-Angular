import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {



  public myForm: FormGroup = this.fb.group ({
    name : ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Warframe', Validators.required],
      ['Halo', Validators.required],
    ])
  });

  public newFavorite : FormControl = new FormControl('',[Validators.required]);

  constructor ( private fb:FormBuilder,
    private validatorsService:ValidatorsService
    ){}

  get favoriteGames () {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  isValidField(field:string){
    return this.validatorsService.isValidField(this.myForm, field)
   }

 isValidFieldInArray(formArray:FormArray, index: number) {
  return formArray.controls[index].errors
      && formArray.controls[index].touched
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

    onAddFavorites():void{
   if (this.newFavorite.invalid) return;

      const newGame = this.newFavorite.value;
            //?En caso d de con trabajar con from builder
      // this.favoriteGames.push(new FormControl(newGame, Validators.required));

      this.favoriteGames.push(
        this.fb.control(newGame, Validators.required)
      );
      this.newFavorite.reset();

    }


  onDeleteFavorite(index:number):void{
    this.favoriteGames.removeAt(index);
  }

  onSubmit():void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return ;}
  console.log(this.myForm.value);
  (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
  this.myForm.reset();
  }





}
