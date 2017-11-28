import { Component } from '@angular/core';
import { IonicPage,NavController,NavParams,MenuController,ModalController} from 'ionic-angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Common } from '../../providers/common';
import { AuthServiceProvider } from '../../providers/auth-service';

import { UserInvitationModalPage } from '../user-invitation-modal/user-invitation-modal';
import { EventDescriptionPage } from '../event-description/event-description';

@IonicPage()
@Component({
  selector: 'page-event-invitation-list',
  templateUrl: 'event-invitation-list.html',
})
export class EventInvitationListPage {

  public resposeData: any;
  public dataSet: any;
  vacios: any;
  userDetails : any;
  item : any;
  invitation = {"event_id":"","staff_id":"","user_id":""};


  constructor(
    public common: Common,
    private nativePageTransitions: NativePageTransitions,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public menu: MenuController) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    
    this.showInvitations(this.userDetails.user_id);

  }// cierra constructor


  descripcionEvento(item) {
    this.navCtrl.push(EventDescriptionPage, { item: item })
  }// cierra metodo descripcionEvento()

  showQr(item) {
    
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 800,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
     };
      this.nativePageTransitions.fade(options);
      const profileModal = this.modalCtrl.create(UserInvitationModalPage, { item: item });
      profileModal.present();
    
    }
 
  showInvitations(user_id) {
    let com = this.common;
    com.presentLoading();
    this.authService
      .postData({"user_id":user_id}, "invitationList")
      .then((result) => {
        com.closeLoading();
        this.resposeData = result;
        console.log(this.resposeData);
        if (this.resposeData.invitations) {
          this.dataSet = this.resposeData.invitations;
        } else {
          console.log("No access");
          this.vacios="No te encuentras registrado en ningun evento";
        }
      }, (err) => {
        com.closeLoading();
      });
  }

}
