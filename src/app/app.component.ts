import {Component, HostListener} from '@angular/core';
import * as AuthActions from "./state/auth/auth.actions";
import {Store} from "@ngrx/store";
import * as fromAuth from "./state/auth/auth.reducer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @HostListener('window:close', ['$event'])
  onClose() {
    console.log(1);
    this.store.dispatch(AuthActions.logout())
  }

  constructor(
    private store: Store<fromAuth.State>,
  ) {}
}
