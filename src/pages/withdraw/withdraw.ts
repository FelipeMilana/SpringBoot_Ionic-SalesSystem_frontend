import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { WithdrawDTO } from '../../models/withdrawDTO';
import { WithdrawService } from '../../services/domain/withdraw.service';

@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  withdraws: WithdrawDTO[] = [];
  page: number = 0;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public withdrawService: WithdrawService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    this.withdrawService.myWithdraws(this.page)
      .subscribe(response => {
        loader.dismiss();
        this.withdraws.concat(response['content'] as WithdrawDTO[]);

        if(this.withdraws.length == 0) {
          this.showFailureAlert();
        }
      }, 
      error => {
        loader.dismiss();
        this.navCtrl.setRoot('MainPage');
      })
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
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
      title: 'Aviso',
      message: 'Não há retiradas registradas!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text:'Ok',
          handler: () => {
           this.askWantAdd();
          }
        }
      ]
    });
    alert.present();
  }

  askWantAdd() {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      message: 'Deseja fazer uma retirada?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text:'Ok',
          handler: () => {
            this.navCtrl.push('');
          }
        },
        {
          text:'Cancel',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
