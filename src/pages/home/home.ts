import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController } from 'ionic-angular';
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
    public auth: AuthService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidEnter() {
    
    let loader = this.presentLoading();

    this.auth.refreshToken()
      .subscribe(response => {
        loader.dismiss();
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('MainPage');
      },
      error => {
        loader.dismiss();
      })
  }


  login() {
    let loader = this.presentLoading();

    this.auth.authenticate(this.creds)
      .subscribe(response => {
        loader.dismiss();
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('MainPage');
      },
      error => {
        loader.dismiss();
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    loader.present();
    return loader;
  }
}
