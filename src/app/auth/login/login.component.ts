import { Component, OnInit } from '@angular/core';
import { Login } from '../../@core/model/login';
import { AuthService } from '../../@core/services/auth.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent implements OnInit {

  public login: Login = {};

  constructor(private auth: AuthService,private toastrService: NbToastrService, public router: Router) {
    this.login = new Login(); 
  }

  ngOnInit() {
   
  }

  async loginEmail() {
    
    try {
      await this.auth.login(this.login);
      this.router.navigate(['/inicio']);
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/argument-error':
          message = 'Digite um e-mail e senha'
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido.';
          break;
        case 'auth/wrong-password':
          message = 'Senha inválida.'
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