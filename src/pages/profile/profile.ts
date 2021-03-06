import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { UserDTO } from '../../models/userDTO';
import { UserService } from '../../services/domain/user.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: UserDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: StorageService) {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    let localUser = this.storage.getLocalUser();

    this.userService.findByEmail(localUser.email)
      .subscribe(response => {
        loader.dismiss();
        this.user = response as UserDTO;
      },
      error => {
        loader.dismiss();
        this.showFailureAlert();
      });
  }

  updateData(user: UserDTO) {
    this.navCtrl.push('UpdateProfileDataPage', {user : user});
  }

  updateDataBankSantander() {
    let bank = 'Santander';
    this.navCtrl.push('UpdateProfileDataBankPage', {bank: bank});
  }

  updateDataBankNubank() {
    let bank = 'Nubank';
    this.navCtrl.push('UpdateProfileDataBankPage', {bank: bank});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde...',
    });
    loader.present();
    return loader;
  }

  showFailureAlert() {
    let alert = this.alertCtrl.create({
      title: 'Erro',
      message: 'Falha ao carregar esta página!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text:'ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
