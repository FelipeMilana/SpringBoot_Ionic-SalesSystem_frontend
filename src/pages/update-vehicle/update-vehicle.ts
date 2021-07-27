import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { VehicleDTO } from '../../models/vehicleDTO';
import { VehicleService } from '../../services/domain/vehicle.service';

@IonicPage()
@Component({
  selector: 'page-update-vehicle',
  templateUrl: 'update-vehicle.html',
})
export class UpdateVehiclePage {

  vehicle: VehicleDTO;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public vehicleService: VehicleService) {

      this.vehicle = this.navParams.get('vehicle');

      this.formGroup = this.formBuilder.group({
        type: [this.vehicle.type, [Validators.required]],
        brand: [this.vehicle.brand, [Validators.required]],
        model: [this.vehicle.model, [Validators.required]],
        version: [this.vehicle.version, [Validators.required]],
        fabYear: [this.vehicle.fabYear, [Validators.required]],
        modYear: [this.vehicle.modYear, [Validators.required]],
        color: [this.vehicle.color, [Validators.required]],
        motor: [this.vehicle.motor, [Validators.required]],
        licensePlate: [this.vehicle.licensePlate, [Validators.required]],
        chassi: [this.vehicle.chassi, [Validators.required]],
        renavam: [this.vehicle.renavam, [Validators.required]],
        description: [this.vehicle.description, []],
        paidValue: [this.vehicle.paidValue, [Validators.required]],
        bank: [this.vehicle.bank, [Validators.required]],
        possibleSellValue: [this.vehicle.possibleSellValue, [Validators.required]]
      });
  }

  update() {
    let loader = this.presentLoading();

    this.vehicleService.update(this.formGroup.value, this.vehicle.id)
      .subscribe(response => {
        loader.dismiss();
        this.showSuccessfulAlert();
      },
      error => {
        loader.dismiss();
      });
  }

  showSuccessfulAlert() {
    let alert = this.alertCtrl.create({
      title:'Sucesso',
      message:'Dados atualizados!',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'Ok',
          handler: () => {
            this.navCtrl.pop();
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
