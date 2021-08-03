import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { SaleDTO } from '../../models/saleDTO';
import { SaleService } from '../../services/domain/sale.service';

@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {

  sales: SaleDTO[] = [];
  page: number = 0;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public saleService: SaleService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    this.saleService.mySales(this.page, 10, "date", "DESC")
      .subscribe(response => {
        loader.dismiss();
        this.sales = this.sales.concat(response['content'] as SaleDTO);
      },
      error => {
        loader.dismiss();
      });
  }

  doRefresh(refresher) {
    this.page = 0;
    this.sales = [];
    this.loadData();
    
    setTimeout(() => {
      refresher.complete();
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
