import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public userService: UserService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {

    let localUser = this.storage.getLocalUser();

    this.userService.findByEmail(localUser.email)
      .subscribe(response => {
        this.userName = response['name'];
      },
      error => {});
  }
}
