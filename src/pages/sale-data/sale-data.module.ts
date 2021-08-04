import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleDataPage } from './sale-data';

@NgModule({
  declarations: [
    SaleDataPage,
  ],
  imports: [
    IonicPageModule.forChild(SaleDataPage),
  ],
})
export class SaleDataPageModule {}
