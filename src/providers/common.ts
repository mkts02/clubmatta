import { Injectable } from '@angular/core';
import { LoadingController,ToastController, Toast  } from 'ionic-angular';

/*
  Generated class for the Common provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Common {
  public loader: any;
  private toastInstance: Toast;
  constructor(public loadingCtrl: LoadingController,public toastCtrl: ToastController) {
    console.log('Hello Common Provider');
  }

  presentLoading(){
   this.loader = this.loadingCtrl.create({content: "Cargando ..."})
  this.loader.present();
  }

  closeLoading(){
  this.loader.dismiss();
  }

  presentToast(mensaje, duracion, posicion){

    if(this.toastInstance) {
      return;
    }

    this.toastInstance = this.toastCtrl.create({
      message: mensaje,
      duration: duracion,
      position: posicion
      
    });
  
    this.toastInstance.onDidDismiss(() => {
      this.toastInstance = null;
    });
  
    this.toastInstance.present();
  }

}
