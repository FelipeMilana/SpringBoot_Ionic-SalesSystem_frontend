import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertSellerOrClientPage } from './insert-seller-or-client';

@NgModule({
  declarations: [
    InsertSellerOrClientPage,
  ],
  imports: [
    IonicPageModule.forChild(InsertSellerOrClientPage),
  ],
})
export class InsertSellerOrClientPageModule {}
