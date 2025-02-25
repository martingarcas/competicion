import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipanteService } from '../../../services/participante/participante.service';
import { EspecialidadService } from '../../../services/especialidad/especialidad.service'; // Importamos el servicio
import { LoginService } from '../../../services/auth/login/login.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-participante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './participante.component.html',
  styleUrls: ['./participante.component.css']
})
export class ParticipanteComponent implements OnInit {
  participantes: any[] = [];
  especialidades: any[] = []; // Lista de especialidades
  participanteSeleccionado: any = null;
  perfil: string = '';
  autenticado: boolean = false;

  constructor(
    private participanteService: ParticipanteService,
    private especialidadService: EspecialidadService, // Servicio de especialidades
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarParticipantes();
    this.cargarEspecialidades(); // Cargar especialidades
    this.perfil = this.loginService.perfil;
    this.autenticado = this.loginService.isLogged();
  }

  cargarParticipantes(): void {
    this.participanteService.getParticipantes().subscribe({
      next: (data) => {
        this.participantes = data;
        console.log(data);
        
      },
      error: (err) => {
        console.error('Error al obtener participantes:', err);
      }
    });
    
  }

  cargarEspecialidades(): void {
    this.especialidadService.obtenerEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (err) => {
        console.error('Error al obtener especialidades:', err);
      }
    });
  }

  seleccionarParticipante(participante: any): void {
    if (this.perfil === 'experto') {
      this.participanteSeleccionado = { ...participante }; // Copia del participante seleccionado
    }
  }

  guardarEdicion(): void {
    if (!this.participanteSeleccionado.nombre || !this.participanteSeleccionado.centro || !this.participanteSeleccionado.especialidadId) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    this.participanteService.updateParticipante(this.participanteSeleccionado.idParticipante, this.participanteSeleccionado).subscribe({
      next: () => {
        alert('Participante actualizado con éxito');
        this.cargarParticipantes();
        this.participanteSeleccionado = null;
      },
      error: () => {
        alert('Error al actualizar el participante');
      }
    });
  }

  cancelarEdicion(): void {
    this.participanteSeleccionado = null;
  }

  volver() {
    window.history.back();
  }

}
