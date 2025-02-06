import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  logged:boolean;
  nombre:string;
  perfil: string;

  constructor() {

    this.logged = true;
    this.nombre="Martin";
    this.perfil = "admin";
  }

  logout() {
    this.logged = false;
  }

  login() {
    this.logged = true;
  }

}
