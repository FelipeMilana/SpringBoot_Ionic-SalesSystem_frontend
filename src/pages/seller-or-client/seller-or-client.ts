import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { PersonDTO } from '../../models/personDTO';
import { PersonService } from '../../services/domain/person.service';

@IonicPage()
@Component({
  selector: 'page-seller-or-client',
  templateUrl: 'seller-or-client.html',
})
export class SellerOrClientPage {

  person: PersonDTO;
  personType: string;
  vehicleId: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public personService: PersonService) {

      this.personType = this.navParams.get('personType');
      this.vehicleId = this.navParams.get('vehicleId');

  }

  searchBar(event) {
    let loader = this.presentLoading();

    this.personService.findByCpfCnpj(event.target.value)
      .subscribe(response => {
        loader.dismiss();
        this.person = response as PersonDTO;
      },
      error => {
        loader.dismiss();
      });
  }

  cancelSearchBar() {
  }

  update() {
    this.navCtrl.push('UpdateSellerOrClientPage', {person: this.person});
  }
  
  next() {
    if(this.personType == 'seller') {
      this.navCtrl.push('InsertVehiclePage', {person: this.person});
    }
    else{
      this.navCtrl.push('SaleDataPage', {person: this.person, vehicleId: this.vehicleId});
    }
  }
  
  insert() {
    if(this.personType == 'seller') {
      this.navCtrl.push('InsertSellerOrClientPage', {personType : this.personType});
    }
    else{
      this.navCtrl.push('InsertSellerOrClientPage', {personType : this.personType, vehicleId: this.vehicleId});
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde...',
    });
    loader.present();
    return loader;
  }
}
