import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { PersonDTO } from '../../models/personDTO';
import { VehicleService } from '../../services/domain/vehicle.service';

@IonicPage()
@Component({
  selector: 'page-insert-vehicle',
  templateUrl: 'insert-vehicle.html',
})
export class InsertVehiclePage {

  person: PersonDTO;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public vehicleService: VehicleService) {

      this.person = this.navParams.get('person');

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
        bank: ['', [Validators.required]],
        possibleSellValue: ['', [Validators.required]],
        seller: [this.person, []]
      });
  }

  insert() {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      message: 'Deseja adicionar esse veículo no estoque?',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'Ok',
          handler: () => {
            let loader = this.presentLoading();

            this.vehicleService.insert(this.formGroup.value)
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
      message:'Veículo adicionado no estoque!',
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
