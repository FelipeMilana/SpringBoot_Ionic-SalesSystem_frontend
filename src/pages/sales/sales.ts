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
  checkLastPage: boolean = false;
  checkSearchBar: boolean = false;
  search: string = '';
  totalProfit: number;
  ticketValue: number;
  
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

        if(response['last']) {
          this.checkLastPage = true;
        }

        this.totalProfit = 0;
        this.ticketValue = 0;
        for(var i=0; i<this.sales.length; i++) {
          this.totalProfit = this.totalProfit + this.sales[i].profit;
        }

        this.ticketValue = this.totalProfit / this.sales.length;
        
      },
      error => {
        loader.dismiss();
      });
  }
  
  findByVehicleModelOrLicensePlate(str: string) {
    let loader = this.presentLoading();

    this.saleService.findByVehicleModelOrLicensePlate(this.page, 10, "date", "DESC", str)
      .subscribe(response => {
        loader.dismiss();
        this.sales = this.sales.concat(response['content'] as SaleDTO);

        if(this.sales.length == 0) {
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

  showDetails(id: string) {
    this.navCtrl.push('SaleDetailsPage', {saleId: id});
  }

  searchBar(event){
    this.page = 0;
    this.sales = [];
    this.checkLastPage = false;
    this.checkSearchBar = true;
    this.search = event.target.value;
    
    this.findByVehicleModelOrLicensePlate(this.search);
  }

  cancelSearchBar() {
    this.page = 0;
    this.sales = [];
    this.checkLastPage = false;
    this.checkSearchBar = false;
    this.loadData();
  }

  doRefresh(refresher) {
    this.page = 0;
    this.sales = [];
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
      this.findByVehicleModelOrLicensePlate(this.search);
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
      message: 'Não há vendas',
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
