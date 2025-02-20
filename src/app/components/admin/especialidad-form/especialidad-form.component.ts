import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspecialidadService } from '../../../services/especialidad/especialidad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-especialidad-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './especialidad-form.component.html',
  styleUrls: ['./especialidad-form.component.css']
})
export class EspecialidadFormComponent {
  nombre: string = '';
  codigo: string = '';
  mensaje: string = '';

  constructor(private especialidadService: EspecialidadService, private router: Router) {}

  crearEspecialidad() {
    if (!this.nombre || !this.codigo) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    const nuevaEspecialidad = { nombre: this.nombre, codigo: this.codigo };

    this.especialidadService.crearEspecialidad(nuevaEspecialidad).subscribe({
      next: () => {
        this.mensaje = 'Especialidad creada con éxito';
        this.nombre = '';
        this.codigo = '';
      },
      error: () => {
        this.mensaje = 'Error al crear la especialidad';
      }
    });
  }

  volver() {
    window.history.back();
  }

}
