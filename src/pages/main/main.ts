import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/domain/user.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  userName: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public userService: UserService,
    public auth: AuthService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {

    let localUser = this.storage.getLocalUser();

    if(localUser && localUser.email) {
      this.userService.findByEmail(localUser.email)
      .subscribe(response => {
        let name = response['name'];
        let nickname : string[]= name.split(' ');
        this.userName = nickname[0];
      },
      error => {
        if(error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
    }
    else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot('HomePage');
  }
}
