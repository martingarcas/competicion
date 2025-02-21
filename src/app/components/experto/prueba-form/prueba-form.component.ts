import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PruebaService } from '../../../services/prueba/prueba.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prueba-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prueba-form.component.html',
  styleUrls: ['./prueba-form.component.css']
})
export class PruebaFormComponent implements OnInit {
  enunciado!: File | null;
  especialidadId: number | null = null;
  puntuacionMaxima: number | null = null; // ✅ Nuevo campo
  mensaje: string = '';

  constructor(
    private pruebaService: PruebaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarEspecialidadDelExperto();
  }

  cargarEspecialidadDelExperto() {
    const storedLogin = sessionStorage.getItem('LOGIN');
    if (storedLogin) {
      const loginData = JSON.parse(storedLogin);
      this.especialidadId = loginData.especialidadId || null;
      console.log('especialidadId cargado:', this.especialidadId);
    }
  }

  seleccionarArchivo(event: any) {
    this.enunciado = event.target.files[0];
    console.log('Archivo seleccionado:', this.enunciado);
  }

  crearPrueba() {
    this.puntuacionMaxima = this.puntuacionMaxima ? Number(this.puntuacionMaxima) : null;
  
    if (!this.enunciado || !this.especialidadId || this.puntuacionMaxima === null || isNaN(this.puntuacionMaxima)) { 
      this.mensaje = 'Por favor, completa todos los campos y selecciona un archivo.';
      return;
    }

    const formData = new FormData();
    formData.append('enunciado', this.enunciado);
    formData.append('especialidadId', this.especialidadId.toString());
    formData.append('puntuacionMaxima', this.puntuacionMaxima.toString()); // ✅ Nuevo campo

    this.pruebaService.crearPrueba(formData).subscribe({
      next: () => {
        this.mensaje = 'Prueba creada con éxito';
        this.enunciado = null;
        this.puntuacionMaxima = null; // Limpiar campo
      },
      error: () => {
        this.mensaje = 'Error al crear la prueba';
      }
    });
  }

  volver() {
    window.history.back();
  }
}
