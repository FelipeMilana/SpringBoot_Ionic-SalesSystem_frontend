import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { VehicleDTO } from '../../models/vehicleDTO';
import { VehicleService } from '../../services/domain/vehicle.service';

@IonicPage()
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {

  vehicles: VehicleDTO[] = [];
  page: number = 0;
  checkLastPage: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public vehicleService: VehicleService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    this.vehicleService.myStock(this.page, 10, "brand", "ASC")
      .subscribe(response => {
        loader.dismiss();
        this.vehicles = this.vehicles.concat(response['content'] as VehicleDTO);

        if(response['last']) {
          this.checkLastPage = true;
        }
      },
      error => {
        loader.dismiss();
      });
  }

  doRefresh(refresher) {
    this.page = 0;
    this.vehicles = [];
    this.checkLastPage = false;
    this.loadData();
    
    setTimeout(() => {
      refresher.complete();
    }, 1000);
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
}