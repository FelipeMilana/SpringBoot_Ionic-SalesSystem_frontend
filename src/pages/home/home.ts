import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginDTO } from '../../models/loginDTO';

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

  constructor(public navCtrl: NavController) {

  }

  login() {
    console.log(this.creds);
  }
}
