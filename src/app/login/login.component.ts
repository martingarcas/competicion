import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario:string;
  contrasenna:string;
  
  constructor(private loginService:LoginService, private route:Router){
    this.usuario = "";
    this.contrasenna = "";
  }

  loguear():void {
    this.loginService.login(this.usuario, this.contrasenna).subscribe((v) => {
      if (v.funciona) {
        this.route.navigate(["/" + v.perfil]);
      } else {
        alert("Error en la autenticación");
      }

    });
  }
  
}
