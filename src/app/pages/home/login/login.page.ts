import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  isTypePassword: boolean = true;
  isLogin =false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { 
    this.initForm();

  }

  ngOnInit() : void{}

  initForm() {
    this.form = new FormGroup({
      email: new FormControl('', 
        {validators: [Validators.required, Validators.email]}
      ),
      password: new FormControl('', 
        {validators: [Validators.required, Validators.minLength(8)]}
      ),
    });
  }
  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    if(!this.form.valid) return;
    console.log(this.form.value);
    this.login(this.form);
  }

  login(form){
    // this.global.showLoder();
    this.isLogin = true
    this.authService.login(form.value.email, form.value.password).then(data => {
      console.log(data);
      this.isLogin = false
      this.router.navigateByUrl('/home');
      // this.global.hideLoader();
      form.reset();
     })

     .catch(e => { 
      this.isLogin = false
       console.log(e);
   //  this.global.hideLoader();
       let msg:string = 'could not sign you up , please try again.';
       if(e.code == 'auth/email-already-in-use'){
         msg = 'Email Already in use';
       }
       this.showAlert(msg);
       });
     }
 
     async showAlert(msg) {
       const alert = await this.alertController.create({
        // header: 'A Short Title Is Best',
       //  subHeader: 'A Sub Header Is Optional',
         message: msg,
         buttons: ['Action'],
       });
   
       await alert.present();
     }
   }
