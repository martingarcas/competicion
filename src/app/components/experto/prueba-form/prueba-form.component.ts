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
  puntuacionMaxima: number | null = null;
  mensaje: string = '';
  items: { descripcion: string, peso: number, gradosConsecucion: number }[] = [];

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

  agregarItem() {
    this.items.push({ descripcion: '', peso: 0, gradosConsecucion: 1 });
  }

  eliminarItem(index: number) {
    this.items.splice(index, 1);
  }

  crearPrueba() {
    this.puntuacionMaxima = this.puntuacionMaxima ? Number(this.puntuacionMaxima) : null;
  
    if (!this.enunciado || !this.especialidadId || this.puntuacionMaxima === null || isNaN(this.puntuacionMaxima)) { 
      this.mensaje = 'Por favor, completa todos los campos y selecciona un archivo.';
      return;
    }

    const sumaPesos = this.items.reduce((sum, item) => sum + item.peso, 0);
    if (sumaPesos > this.puntuacionMaxima) {
      this.mensaje = `La suma de los pesos (${sumaPesos}) no puede ser mayor que la puntuación máxima (${this.puntuacionMaxima}).`;
      return;
    }

    const formData = new FormData();
    formData.append('enunciado', this.enunciado);
    formData.append('especialidadId', this.especialidadId.toString());
    formData.append('puntuacionMaxima', this.puntuacionMaxima.toString());
    formData.append('items', new Blob([JSON.stringify(this.items)], { type: 'application/json' }));

    console.log("FormData enviado:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.pruebaService.crearPrueba(formData).subscribe({
      next: () => {
        this.mensaje = 'Prueba creada con éxito';
        this.enunciado = null;
        this.puntuacionMaxima = null;
        this.items = [];
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
