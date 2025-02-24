import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PruebaService } from '../../../services/prueba/prueba.service';
import { LoginService } from '../../../services/auth/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pruebas',
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-pruebas.component.html',
  styleUrl: './lista-pruebas.component.css'
})
export class ListaPruebasComponent {

  pruebas: any[] = [];
  pruebaSeleccionada: any = null;
  perfil: string = '';
  autenticado: boolean = false;
  especialidadId: number | null = null;

  constructor(
    private pruebaService: PruebaService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.perfil = this.loginService.perfil;
    this.autenticado = this.loginService.isLogged();
    const storedLogin = sessionStorage.getItem('LOGIN');

    if (storedLogin) {
      const loginData = JSON.parse(storedLogin);
      this.especialidadId = loginData.especialidadId;
    }

    if (this.especialidadId) {
      this.cargarPruebas();
    }
  }

  cargarPruebas(): void {
    if (this.especialidadId) {
      this.pruebaService.obtenerPruebasPorEspecialidad(this.especialidadId).subscribe({
        next: (data) => {
          this.pruebas = data;
        },
        error: (err) => {
          console.error('Error al obtener pruebas:', err);
        }
      });
    }
  }

  cancelarSeleccion(): void {
    this.pruebaSeleccionada = null;
  }

  volver() {
    window.history.back();
  }

  descargarEnunciado(pruebaId: number): void {
    this.pruebaService.descargarEnunciado(pruebaId).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
  
        // Nombre del archivo ya está en la base de datos y backend lo maneja
        link.download = `enunciado_${pruebaId}.pdf`;
  
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al descargar el enunciado:', err);
      }
    });
  }    

}
