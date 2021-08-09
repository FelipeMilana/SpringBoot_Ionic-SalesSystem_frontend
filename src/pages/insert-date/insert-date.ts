import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-insert-date',
  templateUrl: 'insert-date.html',
})
export class InsertDatePage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
      });
  }

  next() {
    this.navCtrl.push('SalesReportPage', {startDate: this.formGroup.controls.startDate.value, endDate: this.formGroup.controls.endDate.value});
  }

}
