import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdateProfileDataPage } from './update-profile-data';

@NgModule({
  declarations: [
    UpdateProfileDataPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdateProfileDataPage),
  ],
})
export class UpdateProfileDataPageModule {}
