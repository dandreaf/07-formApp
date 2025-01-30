import { Component } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  standalone: false,

  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent {

  public fb: NonNullableFormBuilder  = new FormBuilder().nonNullable;

  public myForm: FormGroup = this.fb.group({
    gender: [ 'M', Validators.required],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ],
  });

  public person = {
    gender: 'F',
    wantNotifications: false
  };

  isValidField ( field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  };

  //ngSubmit
  onSave(): void {
    if ( this.myForm.invalid ){
      return this.myForm.markAllAsTouched();
    };

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
    // this.myForm.reset();

  };

};
