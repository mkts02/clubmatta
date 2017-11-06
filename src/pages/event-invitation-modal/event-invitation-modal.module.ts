import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventInvitationModalPage } from './event-invitation-modal';

@NgModule({
  declarations: [
    EventInvitationModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EventInvitationModalPage),
  ],
})
export class EventInvitationModalPageModule {}
