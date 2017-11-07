import { Component } from '@angular/core';
import 
{ 
    IonicPage, 
    NavController, 
    NavParams 
} 
from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service";
import { Common } from '../../providers/common';

/**
 * Generated class for the AgreementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agreements',
  templateUrl: 'agreements.html',
})
export class AgreementsPage {
  convenios: string = "universidades";

  public resposeDataUniversities: any;
  public dataSetUniversities: any;
  public resposeDataInstitutes: any;
  public dataSetInstitutes: any;

  userPostDataUniversities = {
    "agreemet_id": "universidad"
  };
  userPostDataInstitutes = {
    "agreemet_id": "instituto"
  };

  constructor(
    public common: Common,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authService: AuthServiceProvider) {

      this.getUniversities();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgreementsPage');
  }

  getUniversities() {
    
    let com = this.common;
    com.presentLoading();

    this.authService
      .postData(this.userPostDataUniversities, "showAgreements")
      .then((result) => {

        com.closeLoading();

        this.resposeDataUniversities = result;
        if (this.resposeDataUniversities.agreements) {
          this.dataSetUniversities = this.resposeDataUniversities.agreements;
          //console.log(this.dataSet);

        } else {
          console.log("No access");
        }

      }, (err) => {
        com.closeLoading();
        //Connection failed message
      });
  }// cierra metodo getUniversities()

  getInstitutes() {
    
    let com = this.common;
    com.presentLoading();

    this.authService
      .postData(this.userPostDataInstitutes, "showAgreements")
      .then((result) => {

        com.closeLoading();

        this.resposeDataInstitutes = result;
        if (this.resposeDataInstitutes.agreements) {
          this.dataSetInstitutes = this.resposeDataInstitutes.agreements;
          //console.log(this.dataSet);

        } else {
          console.log("No access");
        }

      }, (err) => {
        com.closeLoading();
        //Connection failed message
      });
  }// cierra metodo getInstitutes()

}// cierra la clase
