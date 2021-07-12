import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerOrClientPage } from './seller-or-client';

@NgModule({
  declarations: [
    SellerOrClientPage,
  ],
  imports: [
    IonicPageModule.forChild(SellerOrClientPage),
  ],
})
export class SellerOrClientPageModule {}
