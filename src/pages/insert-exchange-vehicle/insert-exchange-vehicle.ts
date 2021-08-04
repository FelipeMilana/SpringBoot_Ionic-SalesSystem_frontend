import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PersonDTO } from '../../models/personDTO';

@IonicPage()
@Component({
  selector: 'page-insert-exchange-vehicle',
  templateUrl: 'insert-exchange-vehicle.html',
})
export class InsertExchangeVehiclePage {

  person: PersonDTO;
  vehicleId: string;
  finalValue: number;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.person = this.navParams.get('person');
      this.vehicleId = this.navParams.get('vehicleId');
      this.finalValue = this.navParams.get('finalValue');

      this.formGroup = this.formBuilder.group({
        id: [null, []],
        type: ['', [Validators.required]],
        brand: ['', [Validators.required]],
        model: ['', [Validators.required]],
        version: ['', [Validators.required]],
        fabYear: ['', [Validators.required]],
        modYear: ['', [Validators.required]],
        color: ['', [Validators.required]],
        motor: ['', [Validators.required]],
        licensePlate: ['', [Validators.required, Validators.min(7), Validators.max(7)]],
        chassi: ['', [Validators.required, Validators.min(17), Validators.max(17)]],
        renavam: ['', [Validators.required, Validators.min(11), Validators.max(11)]],
        description: ['', []],
        paidValue: ['', [Validators.required]],
        possibleSellValue: ['', [Validators.required]],
      });
  }

  next() {
    if(this.finalValue - this.formGroup.controls.paidValue.value > 0) {
      this.navCtrl.push('PaymentMethodPage', {person: this.person, vehicleId: this.vehicleId, finalValue: this.finalValue, exchangeVehicle: this.formGroup.value});
    }
    else{
      this.navCtrl.push('CashbackPaymentPage', {person: this.person, vehicleId: this.vehicleId, finalValue: this.finalValue, exchangeVehicle: this.formGroup.value});
    }
  }
}
