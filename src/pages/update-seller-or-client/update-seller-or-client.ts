import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { PersonDTO } from '../../models/personDTO';
import { PersonService } from '../../services/domain/person.service';

@IonicPage()
@Component({
  selector: 'page-update-seller-or-client',
  templateUrl: 'update-seller-or-client.html',
})
export class UpdateSellerOrClientPage {

  person: PersonDTO;
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public personService: PersonService) {

      this.person = this.navParams.get('person');

      this.formGroup = this.formBuilder.group({
        id:[this.person.id, []],
        name: [this.person.name, [Validators.required]],
        email: [this.person.email, []],
        cpfCnpj: [this.person.cpfCnpj, [Validators.required]],
        telephone: [this.person.telephone, [Validators.required]],
        telephone2: [this.person.telephone2, []],
        address: this.formBuilder.group({
          id: [this.person.address.id, []],
          street: [this.person.address.street, []],
          number: [this.person.address.number, []],
          district: [this.person.address.district, []],
          postalCode: [this.person.address.postalCode, []],
          city: [this.person.address.city, []],
          state: [this.person.address.state, []]
        })
      });
  }

  update() {
    let loader = this.presentLoading();

    this.personService.update(this.formGroup.value, this.person.id)
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
