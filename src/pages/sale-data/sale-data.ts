import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonDTO } from '../../models/personDTO';

@IonicPage()
@Component({
  selector: 'page-sale-data',
  templateUrl: 'sale-data.html',
})
export class SaleDataPage {

  person: PersonDTO;
  vehicleId: string;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.person = this.navParams.get('person');
      this.vehicleId = this.navParams.get('vehicleId');

      this.formGroup = this.formBuilder.group({
        finalValue: ['', [Validators.required]],
        type: ['', Validators.required]
      });
  }

  next() {
    if(this.formGroup.controls.type.value == 1) {
      this.navCtrl.push('InsertExchangeVehiclePage', {person: this.person, vehicleId: this.vehicleId, finalValue: this.formGroup.controls.finalValue.value});
    }
    else{
      this.navCtrl.push('PaymentMethodPage', {person: this.person, vehicleId: this.vehicleId, finalValue: this.formGroup.controls.finalValue.value});
    }
  }

}
