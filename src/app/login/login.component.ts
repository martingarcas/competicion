import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario:string;
  contrasenna:string;
  
  constructor(private loginService:LoginService){
    this.usuario = "";
    this.contrasenna = "";
  }

  loguear():void {
    this.loginService.login(this.usuario, this.contrasenna);
  }
  
}
