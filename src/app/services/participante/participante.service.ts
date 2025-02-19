import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {

  constructor(private http:HttpClient) { }

    getParticipantes():Observable<any> {
      return this.http.get("http://localhost/servidortest/participantes.php", 
    )}
}
