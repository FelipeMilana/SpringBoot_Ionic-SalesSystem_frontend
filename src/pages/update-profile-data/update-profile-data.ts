import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { UserDTO } from '../../models/userDTO';
import { UserService } from '../../services/domain/user.service';

@IonicPage()
@Component({
  selector: 'page-update-profile-data',
  templateUrl: 'update-profile-data.html',
})
export class UpdateProfileDataPage {

  user: UserDTO;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public AlertCtrl: AlertController,
    public userService: UserService,
    public formBuilder: FormBuilder) {

      this.user = this.navParams.get('user');

      this.formGroup = this.formBuilder.group({
        name: [this.user.name, [Validators.required, Validators.min(3)]],
        email: [this.user.email,[]],
        password: [this.user.password, Validators.required],
        santanderBalance: [this.user.santanderBalance, []],
        nubankBalance: [this.user.nubankBalance, []]
      });
  }

  update() {
    let loader = this.presentLoading();

    this.userService.update(this.formGroup.value, this.user.id)
      .subscribe(response => {
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
    let alert = this.AlertCtrl.create({
      title:'Sucesso!',
      message:'Dados atualizados',
      enableBackdropDismiss:false,
      buttons:[
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
