import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInvitationModalPage } from './user-invitation-modal';

@NgModule({
  declarations: [
    UserInvitationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInvitationModalPage),
  ],
})
export class UserInvitationModalPageModule {}
