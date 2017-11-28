import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service";
import { Common } from '../../providers/common';
import { Response } from '@angular/http/src/static_response';


@IonicPage()
@Component({
  selector: 'page-event-invitation-modal',
  templateUrl: 'event-invitation-modal.html',
})
export class EventInvitationModalPage {

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
    
    const data = JSON.parse(localStorage.getItem('userData'));
    this.userDetails = data.userData;
    this.item = navParams.data.item;
    this.invitation.event_id = this.item.id;
    this.invitation.user_id = this.userDetails.user_id;

  }

  ionViewDidLoad() {

  }

  closeModal(){

    this.view.dismiss();
  }

  createCode() {
    this.invitation.staff_id = this.qrData;
    this.showQR = JSON.stringify(this.invitation);
    let com = this.common;
    //com.presentLoading();
    this.authService.postData(this.invitation, "invitation").then((result) =>{
    this.resposeData = result;
    com.closeLoading();
      if(this.resposeData.mensaje.text=="error"){
        com.presentToast("No puedes asistir dos veces al mismo Evento.",  3000, "bottom");
      }else if(this.resposeData.mensaje.text=="exito"){
        com.presentToast("Felicitaciones, ya te encuentras en nuesta lista de invitados!",  3000, "bottom");
      }else{
        com.presentToast("Ha ocurrido un error desconocido, por favor inténtelo nuevamente mas tarde.",  3000, "bottom");
      }
    }, (err) => {
     
    });
    
  }
}