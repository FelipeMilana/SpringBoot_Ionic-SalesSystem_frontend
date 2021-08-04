import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CashbackPaymentPage } from './cashback-payment';

@NgModule({
  declarations: [
    CashbackPaymentPage,
  ],
  imports: [
    IonicPageModule.forChild(CashbackPaymentPage),
  ],
})
export class CashbackPaymentPageModule {}
