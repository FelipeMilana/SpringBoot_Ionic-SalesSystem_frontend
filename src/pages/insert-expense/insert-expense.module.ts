import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsertExpensePage } from './insert-expense';

@NgModule({
  declarations: [
    InsertExpensePage,
  ],
  imports: [
    IonicPageModule.forChild(InsertExpensePage),
  ],
})
export class InsertExpensePageModule {}
