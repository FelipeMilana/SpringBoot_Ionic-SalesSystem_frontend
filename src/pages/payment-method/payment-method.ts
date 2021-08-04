import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonDTO } from '../../models/personDTO';

/**
 * Generated class for the PaymentMethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html',
})
export class PaymentMethodPage {

  person: PersonDTO;
  vehicleId: string;
  finalValue: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = this.navParams.get('person');
    this.vehicleId = this.navParams.get('vehicleId');
    this.finalValue = this.navParams.get('finalValue');
  }

  ionViewDidLoad() {
    console.log(this.person);
    console.log(this.vehicleId);
    console.log(this.finalValue);
  }

}
