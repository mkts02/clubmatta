import {Component} from '@angular/core';
import {IonicPage, NavController, Events} from 'ionic-angular';
import {AuthServiceProvider} from "../../providers/auth-service";

import {UserLoginPage} from "../user-login/user-login";
import {EventListPage} from "../event-list/event-list";
import { Common } from '../../providers/common';

/**
 * Generated class for the Signup page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({selector: 'page-user-register', templateUrl: 'user-register.html'})
export class UserRegisterPage {

  resposeData : any;
  userData = {"name":"", "lname":"", "email":"", "password":"", "birthday":"", "gender":""};

  constructor
  (
    public navCtrl : NavController, 
    public authService : AuthServiceProvider,
    public events: Events, 
    public common: Common
  ) {}

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Signup');
  }

  Gologin(){
    this.navCtrl.push(UserLoginPage);
  }
  signup() {
    /*
    console.log(
                ' Nombre: ',this.userData.name,
                ' Apellido: ',this.userData.lname,
                ' Correo: ',this.userData.email,
                ' Contraseña: ',this.userData.password,
                ' Cumpleaños: ',this.userData.birthday,
                ' Genero: ',this.userData.gender);
    */
    let com = this.common;
    com.presentLoading();
    if(this.userData.name && this.userData.lname && this.userData.email && this.userData.password  && this.userData.birthday  && this.userData.gender){      
      //Api connections
    this.authService.postData(this.userData, "signup").then((result) =>{
    this.resposeData = result;
   // console.log(this.resposeData);
    localStorage.setItem('userData', JSON.stringify(this.resposeData) )
    //si todo es correcto, los datos son guardados en la bd, se crea una sesion y se redirige a la pagina de eventos.
      this.usuarioIniciado();
      com.closeLoading();
    this.navCtrl.push(EventListPage);
    }, (err) => {
      //Connection failed message
    });
  }
  else {
    console.log("Give valid information.");
  }
  
  }

  login() {
    this
      .navCtrl
      .push(UserLoginPage);
  }

  usuarioIniciado() {
    this.events.publish('functionCall:usuarioIniciado', localStorage.getItem('userData'));
  }

}
