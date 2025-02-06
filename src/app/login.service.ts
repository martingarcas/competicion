import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token:string;
  perfil:string;
  logueado:boolean;
  usuario:any;

  constructor() { 
    this.token    = "";
    this.perfil   = "";
    this.logueado = false;
    this.usuario  = {};
  }

  almacenaLogin() {
    var objecto:any;
    objecto={
      token:this.token,
      perfil:this.perfil,
      logueado:this.logueado,
      usuario:this.usuario
    }

    localStorage.setItem("LOGIN", JSON.stringify(objecto));
  }

  recuperar() {

    if (localStorage.getItem("LOGIN")) {

      var cadena:string;

      cadena = localStorage.getItem("LOGIN") || "";

      if (cadena != "") {

        var objecto   = JSON.parse(cadena);
        this.token    = objecto.token;
        this.perfil   = objecto.perfil;
        this.logueado = objecto.logueado;
        this.usuario  = objecto.usuario;
      }

    } else {

      this.logueado = false;
      this.token    = "";
      this.perfil   = "";
      this.usuario  = {};

    }
  }
  
}
