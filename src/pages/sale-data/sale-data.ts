import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonDTO } from '../../models/personDTO';

/**
 * Generated class for the SaleDataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sale-data',
  templateUrl: 'sale-data.html',
})
export class SaleDataPage {

  person: PersonDTO;
  vehicleId: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {

      this.person = this.navParams.get('person');
      this.vehicleId = this.navParams.get('vehicleId');
  }

  ionViewDidLoad() {
    console.log(this.person);
    console.log(this.vehicleId);
  }

}
