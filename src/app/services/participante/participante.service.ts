import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {
  private apiUrl = 'http://localhost:9000/api/participantes';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token'); // Obtiene el token de la sesión
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // ✅ Cualquier usuario puede ver la lista de participantes (SIN token)
  getParticipantes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // ❗ Requiere autenticación (token)
  getParticipanteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createParticipante(participante: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, participante, { headers: this.getHeaders() });
  }

  updateParticipante(id: number, participante: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, participante, { headers: this.getHeaders() });
  }
}
