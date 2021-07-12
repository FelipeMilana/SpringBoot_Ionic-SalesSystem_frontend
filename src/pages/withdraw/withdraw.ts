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
  checkLastPage: boolean = false;
  checkSearchBar: boolean = false;
  search: string = '';

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

    this.withdrawService.myWithdraws(this.page, 10, "date", "DESC")
      .subscribe(response => {
        loader.dismiss();
        this.withdraws = this.withdraws.concat(response['content'] as WithdrawDTO[]);

        if(response['last']) {
          this.checkLastPage = true;
        }
      }, 
      error => {
        loader.dismiss();
        this.navCtrl.setRoot('MainPage');
      })
  }

  delete(id:string) {
    let alert = this.alertCtrl.create({
      title:'Aviso',
      message:'Você deseja  deletar essa retirada?',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'Ok',
          handler: () => {
            let loader = this.presentLoading();
            this.withdrawService.delete(id)
              .subscribe(response => {
                loader.dismiss();
                this.showSuccessfulAlert();
              },
              error => {
                loader.dismiss();
              });
          }
        },
        {
          text:'Cancelar'
        }
      ]
    });
    alert.present();
  }

  findByNameOrBank(string: string) {
    let loader = this.presentLoading();

    this.withdrawService.findByNameOrBank(this.page, 10, "date", "DESC", string)
      .subscribe(response => {
        loader.dismiss();
        this.withdraws = this.withdraws.concat(response['content'] as WithdrawDTO[]);

        if(this.withdraws.length == 0) {
          this.showFailedSearchBar();
        }

        if(response['last']) {
          this.checkLastPage = true;
        }
      },
      error => {
        loader.dismiss();
      });
  }

  searchBar(event){
    this.page = 0;
    this.withdraws = [];
    this.checkLastPage = false;
    this.checkSearchBar = true;
    this.search = event.target.value;
    
    this.findByNameOrBank(this.search);
  }

  cancelSearchBar() {
    this.page = 0;
    this.withdraws = [];
    this.checkLastPage = false;
    this.checkSearchBar = false;
    this.loadData();
  }

  showSuccessfulAlert() {
    let alert = this.alertCtrl.create({
      title:'Sucesso',
      message:'Retirada deletada!',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'Ok'
        }
      ]
    });
    alert.present();
  }

  showFailedSearchBar() {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Não há retiradas',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.cancelSearchBar();
          }
        }
      ]
    });
    alert.present();
  }

  doRefresh(refresher) {
    this.page = 0;
    this.withdraws = [];
    this.checkLastPage = false;
    this.checkSearchBar = false;
    this.loadData();
    
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    
    if(this.checkSearchBar){
      this.findByNameOrBank(this.search);
    }
    else{
      this.loadData();
    }
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
}
