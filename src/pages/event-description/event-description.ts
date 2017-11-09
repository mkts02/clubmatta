import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  ModalController } from 'ionic-angular';
import { EventInvitationModalPage } from '../event-invitation-modal/event-invitation-modal';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';


@IonicPage()
@Component({
  selector: 'page-event-description',
  templateUrl: 'event-description.html',
})
export class EventDescriptionPage {

  events: string = "info";

  item;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private nativePageTransitions: NativePageTransitions,
    public modalCtrl: ModalController,) {
    this.item = navParams.data.item;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EventdescriptionPage');
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

}
