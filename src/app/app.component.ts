import { Component, ViewChild } from '@angular/core';
import { Nav,Platform,MenuController,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EventListPage } from '../pages/event-list/event-list';
import { UserLoginPage } from '../pages/user-login/user-login';
import { AgreementsPage } from '../pages/agreements/agreements';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:any = UserLoginPage;
  pages: Array<{title: string, component: any}>;
  
  constructor(
     public platform: Platform,
     public statusBar: StatusBar, 
     public splashScreen: SplashScreen,
     public app: App, 
     public menu: MenuController) 
  {

    this.initializeApp();
      
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Eventos', component: EventListPage},
      { title: 'Convenios', component: AgreementsPage}
      
    ];
      
  }
      
  initializeApp() 
  {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
/*
  openPage(page) {
    if(page.component) {
        this.nav.setRoot(page.component);
    } else {
        // Since the component is null, this is the logout option
        // ...

        // logout logic
        // ...

        // redirect to home
        //this.nav.setRoot(HomePage);
        this.logout();
    }
}*/
  backToWelcome(){
    //Ksthis.nav.setRoot(LoginPage);
    const root = this.app.getRootNav();
     root.popToRoot();
   }
 
   logout(){
     //Api Token Logout 
     this.nav.setRoot(UserLoginPage);
     localStorage.clear();
     this.menu.enable(false);
      setTimeout(()=> this.backToWelcome(), 1000);
     
   }

}

