import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private apiUrl: string = 'http://localhost:9000/auth/register';

  constructor(private http: HttpClient) { }

  registrar(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }
}
