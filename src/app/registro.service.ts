import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl: string = 'http://localhost:9000/auth/register';
  private especialidadesUrl: string = 'http://localhost:9000/api/especialidades';

  constructor(private http: HttpClient) {}

  private obtenerHeaders(): HttpHeaders {
    const storedLogin = sessionStorage.getItem('LOGIN');
    let token = '';
  
    if (storedLogin) {
      const loginData = JSON.parse(storedLogin);
      token = loginData.token || '';
    }
  
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }  

  registrar(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario, { headers: this.obtenerHeaders() });
  }

  obtenerEspecialidades(): Observable<any> {
    return this.http.get<any>(this.especialidadesUrl, { headers: this.obtenerHeaders() });
  }
}
