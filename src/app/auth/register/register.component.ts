import { Component, OnInit } from '@angular/core';
import { Login } from '../../@core/model/login';
import { AuthService } from '../../@core/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  providers: [AngularFireAuth]
})
export class NgxRegisterComponent implements OnInit {

  
  public login: Login = {};

  constructor(private auth: AuthService,private toastrService: NbToastrService, public router: Router) {
    this.login = new Login(); 
  }

  ngOnInit() {
   
  }

  async register() {
    
    try {
      await this.auth.register(this.login);
      this.router.navigate(['/inicio']);
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'E-mail em uso.'
          break;

        case 'auth/invalid-email':
          message = 'E-mail inválido.'
          break;
      }
      this.showToast(message,"danger");
      console.log(error);
    } finally {
  
      //
    }
  } 

  showToast(mensagem, status) {
    this.toastrService.show(
      status || 'Success',
      mensagem,
      { status });
  }
}