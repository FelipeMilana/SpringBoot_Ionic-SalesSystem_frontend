import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ExpenseService } from '../../services/domain/expense.service';

@IonicPage()
@Component({
  selector: 'page-insert-expense',
  templateUrl: 'insert-expense.html',
})
export class InsertExpensePage {

  vehicleId: string;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public expenseService: ExpenseService) {

      this.vehicleId = this.navParams.get('vehicleId');

      this.formGroup = this.formBuilder.group({
       name: ['', [Validators.required]],
       bank: ['', [Validators.required]],
       value: ['', [Validators.required]]
      });
  }

  insert() {
    let alert = this.alertCtrl.create({
      title: 'Aviso',
      message: 'Deseja adicionar essa despesa ao veículo?',
      enableBackdropDismiss: false,
      buttons:[
        {
          text:'Ok',
          handler: () => {
            let loader = this.presentLoading();

            this.expenseService.insert(this.formGroup.value, this.vehicleId)
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
      message:'Despesa adicionada!',
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
