import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as AuthActions from '../../state/auth/auth.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public passwordMinLength = 8;

  get email(): FormGroup {
    return this.loginFormGroup.get('email') as FormGroup;
  }

  get password(): FormGroup {
    return this.loginFormGroup.get('password') as FormGroup;
  }
  constructor(
    private _formBuilder: FormBuilder,
    private store: Store
  ) {
    this.loginFormGroup = this.initFormGroup();
  }

  initFormGroup(): FormGroup {
    return this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(this.passwordMinLength)]]
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.loginFormGroup.markAllAsTouched()
    if(this.loginFormGroup.valid) {
      this.store.dispatch(AuthActions.loginRequest(this.loginFormGroup.value))
    }
  }
}
