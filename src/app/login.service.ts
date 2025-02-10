import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token:string;
  perfil:string;
  logueado:boolean;
  usuario:any;

  constructor(private http:HttpClient) { 
    this.token    = "";
    this.perfil   = "";
    this.logueado = false;
    this.usuario  = {};
  }

  private almacenar() {
    var objeto:any;
    objeto={
      token:this.token,
      perfil:this.perfil,
      logueado:this.logueado,
      usuario:this.usuario
    }

    sessionStorage.setItem("LOGIN", JSON.stringify(objeto));
  }

  recuperar() {

    if (sessionStorage.getItem("LOGIN")) {

      var cadena:string;

      cadena = sessionStorage.getItem("LOGIN") || "";

      if (cadena != "") {

        var objeto    = JSON.parse(cadena);
        this.token    = objeto.token;
        this.perfil   = objeto.perfil;
        this.logueado = objeto.logueado;
        this.usuario  = objeto.usuario;
      }

    } else {

      this.logueado = false;
      this.token    = "";
      this.perfil   = "";
      this.usuario  = {};

    }
  }

  login(user:string, pass:string) {
    let objeto:any;
    objeto = this;
    this.http.post("http://localhost/servidortest/login.php", 
                          {user:user,pass:pass}
    ).subscribe(function(data:any) {
      objeto.usuario  = {"nombre": data.user} 
      objeto.perfil   = data.perfil;
      objeto.token    = data.token;
      objeto.logueado = true;
      objeto.almacenar();     
    });
  }

  private machacar() {
    sessionStorage.removeItem("LOGIN");
  }

  logout() {
    let objeto:any = this;
    let cont:string|null = sessionStorage.getItem("LOGIN");
    this.http.get("http://localhost/servidortest/login.php?desloguear=" + JSON.parse(cont||"").token)
              .subscribe(function(data) {
                objeto.machacar();
              });
  }

  isLogged():boolean {
    let respuesta:boolean = false;
    let cont:string|null = sessionStorage.getItem("LOGIN");

    if (cont) {
      respuesta = JSON.parse(cont||"").logueado;
    }

    return respuesta;
  }
  
}
