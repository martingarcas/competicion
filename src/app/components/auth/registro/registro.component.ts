import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../../../services/auth/register/registro.service';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  nombre: string = '';
  apellidos: string = '';
  usuario: string = '';
  password: string = '';
  email: string = '';
  especialidadId: number | null = null;
  especialidades: any[] = []; // Lista de especialidades
  errorMessage: string = '';
 
  constructor(private registroService: RegistroService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerEspecialidades();
  }

  obtenerEspecialidades(): void {
    this.registroService.obtenerEspecialidades().subscribe({
      next: (data) => {
        this.especialidades = data;
      },
      error: (error) => {
        console.error('Error al obtener especialidades', error);
      }
    });
  }

  registrarUsuario(): void {
    if (!this.especialidadId) {
      this.errorMessage = "Debes seleccionar una especialidad.";
      return;
    }

    const nuevoUsuario = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      username: this.usuario,
      password: this.password,
      email: this.email,
      especialidadId: this.especialidadId
    };

    this.registroService.registrar(nuevoUsuario).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.errorMessage = "Hubo un error al registrar al usuario. Intenta nuevamente.";
      }
    });
  }

  volver() {
    this.router.navigate(['/admin']);  // Cambia esto según la ruta a la que quieras volver
  }

}
