import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sales-report',
  templateUrl: 'sales-report.html',
})
export class SalesReportPage {

  startDate: string;
  endDate: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.startDate = this.navParams.get('startDate');
      this.endDate = this.navParams.get('endDate');
  }

  ionViewDidLoad() {
    console.log(this.startDate);
    console.log( this.endDate);
  }

}
