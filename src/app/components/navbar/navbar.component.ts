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

  nombre: string = "";
  perfil: string = "";
  especialidadNombre: string = "";

  constructor(private route:Router, private servicio:LoginService) {

    this.nombre="";
    this.perfil = "";
    this.especialidadNombre = "";
  }

  ngOnInit() {  
    this.nombre = this.servicio.getNombre();
    this.perfil = this.servicio.getPerfil();
    this.especialidadNombre = this.servicio.getEspecialidadNombre() || "";

    // Suscribirse a cambios en el perfil para actualizar dinámicamente sin necsidad de recarga
    this.servicio.perfilObservable.subscribe(perfil => {
      this.perfil = perfil || "";
      this.nombre = this.servicio.getNombre();
      this.especialidadNombre = this.servicio.getEspecialidadNombre() || "";

    });
  }

  logout() {
    this.servicio.logout();
    this.nombre = "";
    this.perfil = "";
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
