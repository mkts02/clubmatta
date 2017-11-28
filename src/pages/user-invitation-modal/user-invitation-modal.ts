import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service";
import { Common } from '../../providers/common';
import { Response } from '@angular/http/src/static_response';

/**
 * Generated class for the UserInvitationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-invitation-modal',
  templateUrl: 'user-invitation-modal.html',
})
export class UserInvitationModalPage {

  showQR = null;
  qrData = null;
  userDetails : any;
  item : any;
  invitation = {"event_id":"","staff_id":"","user_id":""};
  resposeData : any;
  
  constructor(
    public view: ViewController,
    public navParams: NavParams,
    public authService : AuthServiceProvider,
    public common: Common) {
    

    this.item = navParams.data.item;
    this.invitation.event_id = this.item.id;
    this.invitation.staff_id = this.item.staff_id;
    this.invitation.user_id = this.item.user_id;
    console.log(this.item);
    this.createCode();

  }


  closeModal(){

    this.view.dismiss();
  }

  createCode() {
    this.showQR = JSON.stringify(this.invitation);
    
  }

}
