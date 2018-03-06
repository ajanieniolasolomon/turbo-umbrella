import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(private afAuth:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams,private toast:ToastController) {
  }

  ionViewDidLoad() {
   this.afAuth.authState.subscribe(data=>{
     if(data.email && data.uid){
      this.toast.create({
        message:  `Welcome to the demo app,${data.email}`,
        duration:3000
        }).present();
     }
     else{
      this.toast.create({
        message:  `sorry no detals about u`,
        duration:3000
        }).present();
        this.navCtrl.push('LoginPage');
     }

   })
  }

}
