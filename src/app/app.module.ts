//default components
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
//end default components

//pages
import { UserLoginPage } from '../pages/user-login/user-login';
import { UserRegisterPage } from '../pages/user-register/user-register';
import { EventListPage } from '../pages/event-list/event-list';
import { EventDescriptionPage } from '../pages/event-description/event-description';
import { EventInvitationModalPage } from '../pages/event-invitation-modal/event-invitation-modal';
import { AgreementsPage } from '../pages/agreements/agreements';
//end pages

//new components
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { AuthServiceProvider } from '../providers/auth-service';
import { Common } from '../providers/common';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { HttpModule } from '@angular/http';
import { ExpandableHeader } from '../components/expandable-header/expandable-header';
import { Base64ToGallery } from  '@ionic-native/base64-to-gallery';
import { DisqusModule } from "ngx-disqus";
// end new components

@NgModule({
  declarations: [
    MyApp,
    UserLoginPage,
    UserRegisterPage,
    EventListPage,
    EventDescriptionPage,
    EventInvitationModalPage,
    AgreementsPage,
    ExpandableHeader
  ],
  imports: [
    BrowserModule,HttpModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false } ),
    NgxQRCodeModule,
    DisqusModule.forRoot('www-clubmatta-cl')
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserLoginPage,
    UserRegisterPage,
    EventListPage,
    EventDescriptionPage,
    EventInvitationModalPage,
    AgreementsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Common,
    Facebook,
    GooglePlus,
    NativePageTransitions,
    BarcodeScanner,
    Base64ToGallery
  ]
})
export class AppModule {}
