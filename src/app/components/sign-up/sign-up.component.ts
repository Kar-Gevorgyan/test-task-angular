import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpFormGroup: FormGroup;
  public passwordMinLength = 8;

  get firstname(): FormGroup {
    return this.signUpFormGroup.get('firstname') as FormGroup;
  }

  get lastname(): FormGroup {
    return this.signUpFormGroup.get('lastname') as FormGroup;
  }

  get email(): FormGroup {
    return this.signUpFormGroup.get('email') as FormGroup;
  }

  get password(): FormGroup {
    return this.signUpFormGroup.get('password') as FormGroup;
  }
  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.signUpFormGroup = this.initFormGroup();
  }

  initFormGroup(): FormGroup {
    return this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]]
    });
  }

  ngOnInit(): void {
  }

  signUp() {
    this.signUpFormGroup.markAllAsTouched()
  }
}
