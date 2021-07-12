import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertVehiclePage } from './insert-vehicle';

@NgModule({
  declarations: [
    InsertVehiclePage,
  ],
  imports: [
    IonicPageModule.forChild(InsertVehiclePage),
  ],
})
export class InsertVehiclePageModule {}
