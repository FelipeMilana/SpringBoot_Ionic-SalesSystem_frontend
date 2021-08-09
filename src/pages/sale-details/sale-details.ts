import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { SaleDTO } from '../../models/saleDTO';
import { SaleService } from '../../services/domain/sale.service';

@IonicPage()
@Component({
  selector: 'page-sale-details',
  templateUrl: 'sale-details.html',
})
export class SaleDetailsPage {

  saleId: string;
  sale: SaleDTO;
  descriptions: String[] = [];
  totalSpend: number;
  totalExpenses:number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public saleService: SaleService) {

      this.saleId = this.navParams.get('saleId');
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    this.saleService.findById(this.saleId)
      .subscribe(response => {
        loader.dismiss();
        this.sale = response as SaleDTO;

        let description = this.sale.vehicle.description;
        this.descriptions = description.split(',');

        this.totalSpend = 0;
        this.totalExpenses = 0;
        for(var i=0; i<this.sale.vehicle.expenses.length; i++) {
          this.totalExpenses = this.totalExpenses + this.sale.vehicle.expenses[i].value;
        }

        this.totalSpend = this.sale.vehicle.paidValue + this.totalExpenses;

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

}
