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
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.personType = this.navParams.get('personType');

      this.formGroup = this.formBuilder.group({
        id:[null, []],
        name: ['', [Validators.required]],
        email: ['', []],
        cpf: ['', [Validators.required]],
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
    this.navCtrl.push('InsertVehiclePage', {person: this.formGroup.value});
  }
}
