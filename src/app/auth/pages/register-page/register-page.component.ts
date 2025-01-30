import { Component, OnInit } from '@angular/core';
import { FormBuilder, NonNullableFormBuilder, FormGroup, Validators } from '@angular/forms';
//import { cantBeStrider, emailPattern, firstNameAndLastnamePattern } from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  standalone: false,

  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent implements OnInit {

  //public fb: NonNullableFormBuilder = new FormBuilder().nonNullable;

  public myForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validatorServices: ValidatorsService,
    private emailValidatorService: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: ['', [ Validators.required, Validators.pattern(this.validatorServices.firstNameAndLastnamePattern) ]],
      // email: ['', [ Validators.required, Validators.pattern(this.validatorServices.emailPattern) ], [ new EmailValidatorService() ] ],
      email: ['', [ Validators.required, Validators.pattern(this.validatorServices.emailPattern) ], [ this.emailValidatorService ] ],
      username: ['', [ Validators.required, this.validatorServices.cantBeStrider ]],
      password: ['', [ Validators.required, Validators.minLength(6) ]],
      password2: ['', [ Validators.required ]],
    }, {
      validators: [
        this.validatorServices.isFieldOneEqualFieldtwo('password', 'password2'),
      ],
    });
  }
;

  isValidField( field: string ) {
    return this.validatorServices.isValidField(this.myForm, field);
  };

  onSubmit(): void {
    return this.myForm.markAllAsTouched();
  };

}
