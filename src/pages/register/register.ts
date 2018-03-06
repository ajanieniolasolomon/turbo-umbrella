import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
user={} as User;
sucess:string='';
errors:string='';
  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController,private afs: AngularFirestore,private afAuth: AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

 register(user:User){
   if(user.name==''|| user.email=='' || user.gender=='' || user.password==''|| user.age==''){
    this.alertCtrl.create({
      title: 'Error!',
      subTitle:'imput error',
      buttons: ['Dismiss']
    }).present();
   }
  else{
    let loading = this.loadingCtrl.create({content : "Register ,please wait..."});
    loading.present();
 this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password)
  .then(r=>{
    this.saveUserInfoFromForm(r,user)
    .then(()=>{
      this.clearmessage(user);
      loading.dismiss();
      this.alertCtrl.create({
        title: 'New user!',
        subTitle: 'Hello world ',
        buttons: ['Dismiss']
      }).present();
    })
  }).catch(e=>{
    loading.dismiss();
    this.alertCtrl.create({
      title: 'Error!',
      subTitle:e,
      buttons: ['Dismiss']
    }).present();
  })
  }
   
 }
 saveUserInfoFromForm(user,r) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

  const data= {
    uid: user.uid,
    email: user.email,
   age:r.age,
   gender:r.gender
   
  }

  return userRef.set(data, { merge: true })


}
clearmessage(user){
  setTimeout(()=>{
   this.sucess='';
   this.errors='';
   user.email='';
   user.password='';
   user.gender='';
   user.age='';
   user.name='';
  },3000)
 
}
login(){
  this.navCtrl.push('LoginPage');
}
}
