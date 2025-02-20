import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private perfilSubject = new BehaviorSubject<string | null>(this.getPerfilDesdeStorage());

  token:string;
  perfil:string;
  logueado:boolean;
  usuario:any;

  constructor(private http:HttpClient) { 
    this.token    = "";
    this.perfil   = "";
    this.logueado = false;
    this.usuario  = {};
    this.recuperar(); // Asegurar que al iniciar, cargamos los datos de sessionStorage
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
    // Asegurar que el token también se guarda directamente con su clave
    sessionStorage.setItem("token", this.token);

    this.perfilSubject.next(this.perfil); // 🔥 Notificar cambio de perfil
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

    this.perfilSubject.next(this.perfil); // 🔥 Notificar el perfil al iniciar
  }

  login(user:string, pass:string):Observable<any> {
    let objeto:any;
    objeto = this;
    return this.http.post("http://localhost:9000/auth/login", 
                          {username:user,password:pass}
    ).pipe(
      map((data:any) => {

        if (data != null && data.token != "") {
          objeto.usuario  = {"nombre": data.username}
          if (data.authorities[0] == "ROLE_EXPERTO") {
            objeto.perfil = "experto";
          } else {
            objeto.perfil = "admin";
          }
          objeto.token    = data.token;
          objeto.logueado = true;
          objeto.almacenar(); 
          return {"funciona": true, "perfil": objeto.perfil};

        } else {
          return {"funciona": false};
        }
   
      })
    )
  }

  private machacar() {
    sessionStorage.removeItem("LOGIN");
    sessionStorage.removeItem("token");
    this.perfil = "";
    this.logueado = false;
    this.usuario = {};

    this.perfilSubject.next(null); // 🔥 Notificar que ya no hay usuario logueado
  }

  logout() {

    this.machacar();
  }
  

  isLogged():boolean {
    let respuesta:boolean = false;
    let cont:string|null = sessionStorage.getItem("LOGIN");

    if (cont) {
      respuesta = JSON.parse(cont||"").logueado;
    }

    return respuesta;
  }

  getNombre():string {
    let respuesta:string = "";
    let cont:string|null = sessionStorage.getItem("LOGIN");

    if (cont) {
      respuesta = JSON.parse(cont||"").usuario.nombre;
    }

    return respuesta;
  }
  

  getPerfil():string {
    let respuesta:string = "";
    let cont:string|null = sessionStorage.getItem("LOGIN");

    if (cont) {
      respuesta = JSON.parse(cont||"").perfil;
    }

    return respuesta;
  }

  private getPerfilDesdeStorage(): string | null {
    const cont = sessionStorage.getItem("LOGIN");
    return cont ? JSON.parse(cont).perfil : null;
  }

  // 🚀 Nueva forma de obtener el perfil como observable
  get perfilObservable() {
    return this.perfilSubject.asObservable();
  }

}
