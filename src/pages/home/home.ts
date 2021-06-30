import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginDTO } from '../../models/loginDTO';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : LoginDTO = {
    email: "",
    password: ""
  };

  constructor(
    public navCtrl: NavController,
    public auth: AuthService) {

  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
      },
      error => {});
  }
}
