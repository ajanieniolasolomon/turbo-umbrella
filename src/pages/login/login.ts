import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
user= {} as User;
  constructor(public loadingCtrl: LoadingController,private alertCtrl: AlertController,private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

 login(user:User){
  let loading = this.loadingCtrl.create({content : "Logging in ,please wait..."});
  loading.present();
    this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    .then(()=>{
      loading.dismiss();
      this.navCtrl.push('HomePage');
    })
    .catch(e=>{
      loading.dismiss();
      this.alertCtrl.create({
        title: 'Error',
        subTitle: e,
        buttons: ['Dismiss']
      }).present();
    })
    
      
    
  


  }
  register(){
    this.navCtrl.push('RegisterPage');
  }

}
