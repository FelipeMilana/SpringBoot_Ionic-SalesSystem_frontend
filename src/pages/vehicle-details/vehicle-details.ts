import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { VehicleDTO } from '../../models/vehicleDTO';
import { VehicleService } from '../../services/domain/vehicle.service';

@IonicPage()
@Component({
  selector: 'page-vehicle-details',
  templateUrl: 'vehicle-details.html',
})
export class VehicleDetailsPage {

  vehicleId: string;
  vehicle: VehicleDTO;
  descriptions: String[] = [];
  totalSpend: number = 0;
  totalExpenses:number = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public vehicleService: VehicleService) {

      this.vehicleId = this.navParams.get('vehicleId');
  }

  ionViewWillEnter() {
    this.loadData();
  }
  
  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let loader = this.presentLoading();

    this.vehicleService.findById(this.vehicleId)
      .subscribe(response => {
        loader.dismiss();
        this.vehicle = response as VehicleDTO;

        let description = response['description'];
        this.descriptions = description.split(',');

        for(var i=0; i<this.vehicle.expenses.length; i++) {
          this.totalExpenses = this.totalExpenses + this.vehicle.expenses[i].value;
        }

        this.totalSpend = this.vehicle.paidValue + this.totalExpenses;
      },
      error => {
        loader.dismiss();
      });
  }

  updateVehicle() {
    this.navCtrl.push('UpdateVehiclePage', {vehicle: this.vehicle});
  }

  delete(id: string) {
    let alert = this.alertCtrl.create({
      title:'Aviso',
      message:'Deseja deletar esse veículo do estoque?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text:'Ok',
          handler: () => {
            let loader = this.presentLoading();

            this.vehicleService.delete(id)
              .subscribe(response => {
                loader.dismiss();
                this.showSuccessfulAlert();
              },
              error => {
                loader.dismiss();
              });
          }
        },
        {
          text:'Cancelar'
        }
      ]
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde...',
    });
    loader.present();
    return loader;
  }

 showSuccessfulAlert() {
    let alert = this.alertCtrl.create({
      title:'Sucesso',
      message:'Veículo deletado!',
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
}