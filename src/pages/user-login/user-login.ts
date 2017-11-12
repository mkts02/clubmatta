
import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicPage, NavController, ToastController,MenuController, Events } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth-service";
import { Common } from '../../providers/common';
import { EventListPage } from '../event-list/event-list';
import { UserRegisterPage } from '../user-register/user-register';
import {MyApp} from '../../app/app.component'
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLoginPage {

  FB_APP_ID: number = 1915138275374458;
  
  resposeData : any;
  userData = {"username":"", "password":""};
  userDetails: any;

  constructor(
    public fb: Facebook,
    public gp: GooglePlus,
    public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthServiceProvider, 
    public common: Common,
    private toastCtrl:ToastController,
    private nativePageTransitions: NativePageTransitions,
  public events: Events) {
      if(localStorage.getItem('userData')){
        this.navCtrl.setRoot(EventListPage);
      }

      this.fb.browserInit(this.FB_APP_ID, "v2.10");

      
  }// cierra constructor


  Gosignup(){
    this.navCtrl.push(UserRegisterPage);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad Login');
    this.menu.swipeEnable(false);
  }

  login(){

    let com = this.common;
    let env = this;
    com.presentLoading();

   if(this.userData.username && this.userData.password){
    this.authService.postData(this.userData, "login").then((result) =>{
      com.closeLoading();
    this.resposeData = result;
    console.log(JSON.stringify(env.resposeData));
    if(this.resposeData.userData){
     localStorage.setItem('userData', JSON.stringify(this.resposeData) )
      env.goEvents();
      console.log(this.resposeData);
    }
    else{
      com.closeLoading();
      this.presentToast("Por favor introduzca un usuario y contraseña validos.");
    }
    


    }, (err) => {
      com.closeLoading();
      //Connection failed message
    });
   }
   else{
    com.closeLoading();
    this.presentToast("Introduzca los datos");
   }
  
  }

 // Login REDES SOCIALES

 //FACEBOOK

  fbLogin(){
    let permissions = new Array<string>();
    let com = this.common;
    let env = this;

    com.presentLoading();
    
    permissions = ['public_profile','email','user_birthday'];
    this.fb.login(permissions)
    .then(function(response){
      com.closeLoading();
      let params = new Array<string>();
      if(response.status ==="connected") {
        let userId = response.authResponse.userID;
          //Getting name and gender properties
        env.fb.api("/me?fields=name,gender,email,birthday", params)
        .then(function(user) {
          user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
          user.socialType="facebook";
        
             if(typeof user.email === "undefined" || typeof user.birthday === "undefined"){

              env.fb.logout()
              .then(function(response) {
                 alert("permisos no concedidos");
              }, function(error){
                console.log(error);
              });
                
            }else{

                env.authService.postData(user, "facebookLogin").then((result) =>{
                env.resposeData = result;
                console.log(JSON.stringify(env.resposeData));
                localStorage.setItem('userData', JSON.stringify(env.resposeData) )
                env.goEvents();
  
                }, (err) => {
                  console.log(JSON.stringify(err));
                });
            }
      })
        
     }else{
       console.log(response);
     }
     
    }, function(error){
      console.log("Acción Cancelada ");
      com.closeLoading();
    });
    
  }

  //GOOGLE 

  gpLogin(){
    let com = this.common;
    let env = this;

    com.presentLoading();
    this.gp.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '230809789145-h8udnp6h8ovttou8sart7dlfs8av1545.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then(function (user) {
      com.closeLoading();
      console.log("Success");
      env.authService.postData(user, "googleLogin").then((result) =>{
      env.resposeData = result;
      console.log(JSON.stringify(env.resposeData));
      localStorage.setItem('userData', JSON.stringify(env.resposeData) )
      env.goEvents();

      }, (err) => {
        console.log(JSON.stringify(err));
      });

    }, function (error) {
        console.log(JSON.stringify(error));
        com.closeLoading();
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  usuarioIniciado() {
    this.events.publish('functionCall:usuarioIniciado', localStorage.getItem('userData'));
  }

  goEvents() {
    
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
     };
     this.usuarioIniciado();
      this.nativePageTransitions.flip(options);

      this.navCtrl.push(EventListPage);
    
    }



}