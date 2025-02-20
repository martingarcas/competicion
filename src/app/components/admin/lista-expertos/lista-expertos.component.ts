import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroService } from '../../../services/auth/register/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-expertos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-expertos.component.html',
  styleUrls: ['./lista-expertos.component.css']
})
export class ListaExpertosComponent implements OnInit {
  expertos: any[] = [];
  especialidades: any[] = [];
  expertoSeleccionado: any = null;

  constructor(private registroService: RegistroService) {}

  ngOnInit() {
    this.obtenerExpertos();
    this.obtenerEspecialidades();
  }

  obtenerExpertos() {
    this.registroService.obtenerExpertos().subscribe(
      (data) => this.expertos = data,
      (error) => console.error('Error al obtener expertos', error)
    );
  }

  obtenerEspecialidades() {
    this.registroService.obtenerEspecialidades().subscribe(
      (data) => this.especialidades = data,
      (error) => console.error('Error al obtener especialidades', error)
    );
  }

  editarExperto(experto: any) {
    this.expertoSeleccionado = { ...experto };
  }

  guardarCambios() {
    if (this.expertoSeleccionado) {
      this.registroService.actualizarExperto(this.expertoSeleccionado).subscribe(
        () => {
          this.obtenerExpertos();
          this.cancelarEdicion();
        },
        (error) => console.error('Error al actualizar experto', error)
      );
    }
  }

  cancelarEdicion() {
    this.expertoSeleccionado = null;
  }

  obtenerNombreEspecialidad(id: number) {
    const especialidad = this.especialidades.find(e => e.idEspecialidad === id);
    return especialidad ? especialidad.nombre : 'No asignado';
  }

  volver() {
    window.history.back();
  }
}
