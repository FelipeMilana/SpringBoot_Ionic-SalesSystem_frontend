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
  valueInStock: number;
  sellValuesInStock: number;
  checkSearchBar: boolean = false;
  search: string = '';

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

        this.valueInStock = 0;
        this.sellValuesInStock = 0;
        for(var i=0; i<this.vehicles.length; i++) {
          
          let totalExpenses = 0;
          for(var j=0; j<this.vehicles[i].expenses.length; j++) {
            totalExpenses = totalExpenses + this.vehicles[i].expenses[j].value;
          }

          this.valueInStock = this.valueInStock +  this.vehicles[i].paidValue + totalExpenses;
          this.sellValuesInStock = this.sellValuesInStock + this.vehicles[i].possibleSellValue;
        }
        return this.valueInStock;
      },
      error => {
        loader.dismiss();
      });
  }

  findByModelOrLicensePlate(str: string) {
    let loader = this.presentLoading();

    this.vehicleService.findByModelOrLicensePlate(this.page, 10, "brand", "ASC", str)
      .subscribe(response => {
        loader.dismiss();
        this.vehicles = this.vehicles.concat(response['content'] as VehicleDTO);

        if(this.vehicles.length == 0) {
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
    this.vehicles = [];
    this.checkLastPage = false;
    this.checkSearchBar = true;
    this.search = event.target.value;
    
    this.findByModelOrLicensePlate(this.search);
  }

  cancelSearchBar() {
    this.page = 0;
    this.vehicles = [];
    this.checkLastPage = false;
    this.checkSearchBar = false;
    this.loadData();
  }

  doRefresh(refresher) {
    this.page = 0;
    this.vehicles = [];
    this.checkLastPage = false;
    this.checkSearchBar = false;
    this.loadData();
    
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;

    if(this.checkSearchBar) {
      this.findByModelOrLicensePlate(this.search);
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

  showFailedSearchBar() {
    let alert = this.alertCtrl.create({
      title: 'Alerta',
      message: 'Não há veículos',
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
}