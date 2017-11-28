import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventInvitationListPage } from './event-invitation-list';

@NgModule({
  declarations: [
    EventInvitationListPage,
  ],
  imports: [
    IonicPageModule.forChild(EventInvitationListPage),
  ],
})
export class EventInvitationListPageModule {}
