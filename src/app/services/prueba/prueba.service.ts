import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {
  private apiUrl = 'http://localhost:9000/api/pruebas';

  constructor(private http: HttpClient) {}

  private obtenerHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // ✅ Obtener todas las pruebas
  obtenerPruebas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.obtenerHeaders() });
  }

  // ✅ Obtener una prueba por ID
  obtenerPruebaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.obtenerHeaders() });
  }

  // ✅ Crear una nueva prueba con FormData
  crearPrueba(prueba: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crear`, prueba, { headers: this.obtenerHeaders() });
  }

  obtenerPruebasPorEspecialidad(especialidadId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/especialidad/${especialidadId}`, { headers: this.obtenerHeaders() });
  }

  descargarEnunciado(pruebaId: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('TOKEN')}`
    });
  
    return this.http.get(`http://localhost:9000/api/pruebas/${pruebaId}/descargar`, {
      headers,
      responseType: 'blob'
    });
  }
  

}
