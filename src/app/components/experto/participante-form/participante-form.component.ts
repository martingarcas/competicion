import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParticipanteService } from '../../../services/participante/participante.service';
import { EspecialidadService } from '../../../services/especialidad/especialidad.service'; // Importa el servicio
import { Router } from '@angular/router';

@Component({
  selector: 'app-participante-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './participante-form.component.html',
  styleUrls: ['./participante-form.component.css']
})
export class ParticipanteFormComponent implements OnInit {
  nombre: string = '';
  centro: string = '';
  especialidadId: number | null = null;
  mensaje: string = '';

  especialidades: any[] = []; // Lista de especialidades

  constructor(
    private participanteService: ParticipanteService, 
    private especialidadService: EspecialidadService, // Inyectar servicio
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
      console.log('Especialidad asignada automáticamente:', this.especialidadId);
    }
  }

  crearParticipante() {
    if (!this.nombre || !this.centro || !this.especialidadId) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    const nuevoParticipante = {
      nombre: this.nombre,
      centro: this.centro,
      especialidadId: this.especialidadId
    };

    this.participanteService.createParticipante(nuevoParticipante).subscribe({
      next: () => {
        this.mensaje = 'Participante creado con éxito';
        this.nombre = '';
        this.centro = '';
        this.especialidadId = null;
      },
      error: () => {
        this.mensaje = 'Error al crear el participante';
      }
    });
  }

  volver() {
    window.history.back();
  }
}
