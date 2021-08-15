import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-insert-seller-or-client',
  templateUrl: 'insert-seller-or-client.html',
})
export class InsertSellerOrClientPage {

  personType: string;
  vehicleId: string;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.personType = this.navParams.get('personType');
      this.vehicleId = this.navParams.get('vehicleId');

      this.formGroup = this.formBuilder.group({
        id:[null, []],
        name: ['', [Validators.required]],
        email: ['', []],
        cpfCnpj: ['', [Validators.required]],
        telephone: ['', [Validators.required]],
        telephone2: ['', []],
        address: this.formBuilder.group({
          id: [null, []],
          street: ['', []],
          number: ['', []],
          district: ['', []],
          postalCode: ['', []],
          city: ['', []],
          state: ['', []]
        })
      });
  }

  insert() {
    if(this.personType == 'seller') {
      this.navCtrl.push('InsertVehiclePage', {person: this.formGroup.value});
    }
    else{
      this.navCtrl.push('SaleDataPage', {person: this.formGroup.value, vehicleId: this.vehicleId});
    }
  }
}
