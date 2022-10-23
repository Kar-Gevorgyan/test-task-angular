import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {SignUpComponent} from "./components/sign-up/sign-up.component";
import {TodosComponent} from "./components/todos/todos.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'sign-up', component: SignUpComponent},
      {path: 'todos', component: TodosComponent},
      {path: '**', redirectTo: '/'}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
