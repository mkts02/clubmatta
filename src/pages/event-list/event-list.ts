import { Component } from '@angular/core';
import 
{ 
    IonicPage,
    NavController,
    ToastController,
    NavParams,
    MenuController,
    ModalController,
    Events
} 
from 'ionic-angular';

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { Common } from '../../providers/common';
import { AuthServiceProvider } from "../../providers/auth-service";
import { EventDescriptionPage } from '../event-description/event-description';
import { EventInvitationModalPage } from '../event-invitation-modal/event-invitation-modal';




@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {

  public resposeData: any;
  public dataSet: any;

  userPostData = {
    "user_id": ""
  };

  constructor(
    public common: Common,
    private nativePageTransitions: NativePageTransitions,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    private toastCtrl:ToastController,
    public menu: MenuController,
    public events: Events) {
    
      menu.enable(true);
    this.getEvents();

  }// cierra constructor

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Login');
    this.menu.swipeEnable(true);
    console.log("DIDzz_LOAD---------------------------------------------------------------------------------------");
  }

  
  ionViewCanEnter() {
    console.log("CAN_ENTER---------------------------------------------------------------------------------------");
    this.usuarioIniciado();
  }

  usuarioIniciado() {
    this.events.publish('functionCall:usuarioIniciado', localStorage.getItem('userData'));
  }

  ionViewWillEnter() {
    console.log("WILL_ENTER---------------------------------------------------------------------------------------");

  }
  ionViewDidEnter() {
    console.log("DID_ENTER---------------------------------------------------------------------------------------");
  }


  ionViewWillLeave() {
    console.log("WILL_LEAVE---------------------------------------------------------------------------------------");
  }
  ionViewDidLeave() {
    console.log("DID_LEAVE---------------------------------------------------------------------------------------");
  }


  showInvitationModal(item) {
    
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
      const profileModal = this.modalCtrl.create(EventInvitationModalPage, { item: item });
      profileModal.present();
    
    }
 
  descripcionEvento(item) {
    this.navCtrl.push(EventDescriptionPage, { item: item })
  }// cierra metodo descripcionEvento()

  getEvents() {
    
    let com = this.common;
    com.presentLoading();

    this.authService
      .postData(this.userPostData, "showEvents")
      .then((result) => {

        com.closeLoading();

        this.resposeData = result;
        if (this.resposeData.events) {
          this.dataSet = this.resposeData.events;
          //console.log(this.dataSet);

        } else {
          console.log("No access");
        }

      }, (err) => {
        com.closeLoading();
        //Connection failed message
      });
  }// cierra metodo getEvents()

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}// cierra clase