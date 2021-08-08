import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleDetailsPage } from './sale-details';

@NgModule({
  declarations: [
    SaleDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleDetailsPage),
  ],
})
export class SaleDetailsPageModule {}
