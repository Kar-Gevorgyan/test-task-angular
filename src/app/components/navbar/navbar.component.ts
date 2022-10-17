import {Component} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {Store} from "@ngrx/store";
import * as fromAuth from '../../state/auth/auth.reducer'
import * as AuthActions from "../../state/auth/auth.actions";
import {IUser} from "../../interfaces/user.interface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  showMenu = false;
  faBars = faBars;

  user$ = this.store.select(fromAuth.selectUser)

  constructor(
    private store: Store<fromAuth.State>,
  ) {}

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }
}
