import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/domain/user.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        name: ['',[Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        santanderBalance: ['', Validators.required],
        nubankBalance: ['', Validators.required]
      });
  }

  signupUser() {
    let loader = this.presentLoading();

    this.userService.insert(this.formGroup.value)
      .subscribe(response => {
        loader.dismiss();
        this.showSuccessfulAlert();
      },
      error => {
        loader.dismiss();
      });
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: 'Aguarde...',
    });
    loader.present();
    return loader;
  }

  showSuccessfulAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado',
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
