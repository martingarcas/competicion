import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EspecialidadService } from '../../services/especialidad/especialidad.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login/login.service';

@Component({
  selector: 'app-lista-especialidades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-especialidades.component.html',
  styleUrls: ['./lista-especialidades.component.css']
})
export class ListaEspecialidadesComponent implements OnInit {
  especialidades: any[] = [];
  especialidadSeleccionada: any = null;
  esAdmin: boolean = false;

  constructor(private especialidadService: EspecialidadService, private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {
    this.obtenerEspecialidades();
    this.esAdmin = this.loginService.getPerfil() === 'admin';
  }

  obtenerEspecialidades(): void {
    this.especialidadService.obtenerEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (error) => {
        console.error('Error al obtener especialidades', error);
      }
    });
  }

  seleccionarEspecialidad(especialidad: any): void {
    this.especialidadSeleccionada = { ...especialidad };
  }

  guardarEdicion(): void {
    if (!this.especialidadSeleccionada.nombre || !this.especialidadSeleccionada.codigo) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    this.especialidadService.actualizarEspecialidad(this.especialidadSeleccionada.idEspecialidad, this.especialidadSeleccionada).subscribe({
      next: () => {
        alert('Especialidad actualizada con éxito');
        this.obtenerEspecialidades();
        this.especialidadSeleccionada = null;
      },
      error: () => {
        alert('Error al actualizar la especialidad');
      }
    });
  }

  cancelarEdicion(): void {
    this.especialidadSeleccionada = null;
  }

  volver() {
    window.history.back();
  }

}
