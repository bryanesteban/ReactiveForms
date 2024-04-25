import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  public myForm: FormGroup = this.fb.group({
    gender:['M', Validators.required ],
    wantNotification:[true, Validators.required ],
    termsAndConditions:[false, Validators.requiredTrue ],
  });


  constructor( private fb: FormBuilder){}

  isValidField(field:string) :boolean | null{
    return  this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  }

  getFieldError(field:string): string | null {

    if( !this.myForm.controls[field] ) return null;

    const errors = this.myForm.controls[field].errors || {};
    for( const key of Object.keys(errors) ){
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Minimo ${ errors['minlength'].requiredLength} caraters.`;

        case 'requiredTrue':
          return 'Debe de aceptar las condiciones de uso';

      }
    }

    return "";
  }

  //ngSubmit
  onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm);
    this.myForm.reset();
  }
}
