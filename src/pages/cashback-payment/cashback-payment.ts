import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ExchangeVehicleDTO } from '../../models/exchangeVehicleDTO';
import { PersonDTO } from '../../models/personDTO';
import { SaleService } from '../../services/domain/sale.service';

@IonicPage()
@Component({
  selector: 'page-cashback-payment',
  templateUrl: 'cashback-payment.html',
})
export class CashbackPaymentPage {
  
  person: PersonDTO;
  vehicleId: string;
  finalValue: number;
  exchangeVehicle: ExchangeVehicleDTO;
  formGroup: FormGroup;

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
        id: [null, []],
        finalValue: [this.finalValue, []],
        payment: this.formBuilder.group({
          cashback: [this.exchangeVehicle.paidValue - this.finalValue, []],
          bank: ['', [Validators.required]],
          exchangeVehicle: [this.exchangeVehicle, []],
          "@type": ['pagamentoTrocaComTroco', []]
        }),
        client: [this.person, []]
      });
  }

  insert() {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      message: 'Deseja realizar essa venda?',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'Ok',
          handler: () => {
            let loader = this.presentLoading();

            this.saleService.insert(this.formGroup.value, this.vehicleId)
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
