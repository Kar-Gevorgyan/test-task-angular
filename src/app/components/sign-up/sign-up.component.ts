import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as AuthActions from "../../state/auth/auth.actions";
import {Store} from "@ngrx/store";

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
    private _formBuilder: FormBuilder,
    private store: Store
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
    if(this.signUpFormGroup.valid) {
      this.store.dispatch(AuthActions.signUpRequest(this.signUpFormGroup.value))
    }
  }
}
