import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { UserDTO } from '../../models/userDTO';
import { UserService } from '../../services/domain/user.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-update-profile-data-bank',
  templateUrl: 'update-profile-data-bank.html',
})
export class UpdateProfileDataBankPage {

  bank: string;
  user: UserDTO;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public storage: StorageService,
    public userService: UserService,
    public formBuilder: FormBuilder) {

      this.bank = this.navParams.get('bank');

      this.formGroup = this.formBuilder.group({
        value:['', [Validators.required]]
      });
  }

  ionViewDidLoad(){
    this.loadData();
  }

  loadData() {
    let localUser = this.storage.getLocalUser();

    this.userService.findByEmail(localUser.email)
      .subscribe(response => {
        this.user = response as UserDTO;
      },
      error => {});
  }

  update() {
    let loader = this.presentLoading();

    this.userService.updateBalance(this.formGroup.value, this.user.id, this.bank)
      .subscribe(response =>{
        loader.dismiss();
        this.showSuccessfulAlert();
      },
      error =>{
        loader.dismiss();
      });
  }
  
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content:'Aguarde...',
    });
    loader.present();
    return loader;
  }

  showSuccessfulAlert() {
    let alert = this.alertCtrl.create({
      title:'Sucesso!',
      message:'Transação efetuada',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
