import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { WithdrawService } from '../../services/domain/withdraw.service';

@IonicPage()
@Component({
  selector: 'page-insert-withdraw',
  templateUrl: 'insert-withdraw.html',
})
export class InsertWithdrawPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public withdrawService: WithdrawService,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        name: ['', [Validators.required]],
        bank: ['', [Validators.required]],
        value: ['', [Validators.required]]
      });
  }

  insert() {
    let loader = this.presentLoading();

    this.withdrawService.insert(this.formGroup.value)
      .subscribe(response => {
        loader.dismiss();
        this.showSuccessfulAlert();
      },
      error => {
        loader.dismiss();
      });
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde...',
    });
    loader.present();
    return loader;
  }

  showSuccessfulAlert() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Despesa cadastrada!',
      enableBackdropDismiss: false,
      buttons: [
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
