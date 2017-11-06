import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

@IonicPage()
@Component({
  selector: 'page-event-invitation-modal',
  templateUrl: 'event-invitation-modal.html',
})
export class EventInvitationModalPage {

  QRencode : any;
  showQR = null;
  qrData = null;
  userDetails : any;
  item : any;
  invitation = {"event_id":"","staff_id":"","user_id":"","image_url":""};
  
  constructor(
    public view: ViewController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private base64ToGallery: Base64ToGallery) {
    
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
    /*
    this.QRencode = this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.item);
   
    this.base64ToGallery.base64ToGallery(this.QRencode, { prefix: '_img' }).then(
      res => console.log('Saved image to gallery ', res),
      err => console.log('Error saving image to gallery ', err)
    );
    //this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.item);
    */
}
/*
  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    }, (err) => {
        console.log('Error: ', err);
    });
  }

*/



}
