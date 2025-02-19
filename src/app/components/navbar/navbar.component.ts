import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login/login.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  nombre:string;
  perfil: string;

  constructor(private route:Router, private servicio:LoginService) {

    this.nombre="";
    this.perfil = "";
  }

  logout() {
    this.servicio.logout();
    this.nombre = "";
    this.route.navigate(['/']);
  }

  login() {
    this.route.navigate(['/login']);
  }

  isLogged() {
    return this.servicio.isLogged();
  }

  getNombre() {
    return this.servicio.getNombre();
  }

}
