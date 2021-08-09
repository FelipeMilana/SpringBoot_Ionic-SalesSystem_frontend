import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesReportPage } from './sales-report';

@NgModule({
  declarations: [
    SalesReportPage,
  ],
  imports: [
    IonicPageModule.forChild(SalesReportPage),
  ],
})
export class SalesReportPageModule {}
