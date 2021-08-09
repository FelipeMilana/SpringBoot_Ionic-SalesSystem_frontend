import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { SaleDTO } from '../../models/saleDTO';
import { SaleService } from '../../services/domain/sale.service';

@IonicPage()
@Component({
  selector: 'page-sales-report',
  templateUrl: 'sales-report.html',
})
export class SalesReportPage {

  startDate: string;
  endDate: string;
  sales: SaleDTO[] = [];
  page: number = 0;
  checkLastPage: boolean = false;
  totalProfit: number;
  ticketValue: number;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public saleService: SaleService) {

      this.startDate = this.navParams.get('startDate');
      this.endDate = this.navParams.get('endDate');
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    this.saleService.monthlyReport(this.page, 10, "date", "ASC", this.startDate, this.endDate)
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
        
        this.showEmailOk();
      },
      error => {
        loader.dismiss();
      });
  }

  showDetails(id: string) {
    this.navCtrl.push('SaleDetailsPage', {saleId: id});
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

  showEmailOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Relatório enviado para o seu email!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });
    alert.present();
  }
}