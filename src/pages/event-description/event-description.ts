import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-event-description',
  templateUrl: 'event-description.html',
})
export class EventDescriptionPage {

  item;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data.item;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EventdescriptionPage');
  }

}
