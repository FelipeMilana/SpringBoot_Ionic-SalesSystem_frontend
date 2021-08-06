import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ExchangeVehicleDTO } from '../../models/exchangeVehicleDTO';
import { PersonDTO } from '../../models/personDTO';
import { SaleDTO } from '../../models/saleDTO';
import { SaleService } from '../../services/domain/sale.service';

@IonicPage()
@Component({
  selector: 'page-payment-method',
  templateUrl: 'payment-method.html',
})
export class PaymentMethodPage {

  person: PersonDTO;
  vehicleId: string;
  finalValue: number;
  exchangeVehicle: ExchangeVehicleDTO;
  formGroup: FormGroup;
  sale: SaleDTO = {
    id: null,
    date: null,
    finalValue: null,
    profit: null,
    vehicle: null,
    payment: null,
    client: null
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public saleService: SaleService) {

      this.person = this.navParams.get('person');
      this.vehicleId = this.navParams.get('vehicleId');
      this.finalValue = this.navParams.get('finalValue');
      this.exchangeVehicle = this.navParams.get('exchangeVehicle');

      this.formGroup = this.formBuilder.group({
        bank: ['', []],
        cashValue: ['', []],
        name: ['', []],
        cnpj: ['', []],
        telephone: ['', []],
        quota: ['', []],
        group: ['', []],
        inputValue: ['', []],
        inputBank: ['', []],
        consortiumValue: ['', []],
        consortiumBank: ['', []],
        fundedValue: ['', []],
        fundedBank: ['', []],
        exchangeVehicle: [this.exchangeVehicle, []],
        "@type": ['', [Validators.required]]
      });
  }

  insert() {
    this.sale.finalValue = this.finalValue;
    this.sale.payment = this.formGroup.value;
    this.sale.client = this.person;

    let alert = this.alertCtrl.create({
      title: 'Aviso',
      message: 'Deseja realizar essa venda?',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'Ok',
          handler: () => {
            let loader = this.presentLoading();

            this.saleService.insert(this.sale, this.vehicleId)
              .subscribe(response => {
                loader.dismiss();
                this.showSuccessFulAlert();
              },
              error => {
                loader.dismiss();
              });
          }
        },
        {
          text:'Cancel'
        }
      ]
    });
    alert.present();
    
  }

  showSuccessFulAlert() {
    let alert = this.alertCtrl.create({
      title:'Sucesso',
      message:'Venda Realizada!',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'Ok',
          handler: () => {
            this.navCtrl.setRoot('MainPage');
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content:'Aguarde...',
    });
    loader.present();
    return loader;
  }

}
