import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {
  private apiUrl: string = 'http://localhost:9000/api/especialidades';

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

  crearEspecialidad(especialidad: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, especialidad, { headers: this.obtenerHeaders() });
  }

  obtenerEspecialidades(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.obtenerHeaders() });
  }

  actualizarEspecialidad(id: number, especialidad: any) {
    return this.http.put(`${this.apiUrl}/${id}`, especialidad, { headers: this.obtenerHeaders() });
  }
}