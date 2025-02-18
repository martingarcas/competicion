import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroService } from '../registro.service';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  usuario: string = '';
  password: string = '';
  email: string = '';
  errorMessage: string = '';

  constructor(private registroService: RegistroService, private router: Router) { }

  registrarUsuario(): void {
    const nuevoUsuario = {
      username: this.usuario,
      password: this.password,
      email: this.email
    };

    this.registroService.registrar(nuevoUsuario).subscribe({
      next: (data) => {
        // Redirigir al admin a la lista de usuarios después de un registro exitoso
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        this.errorMessage = "Hubo un error al registrar al usuario. Intenta nuevamente.";
      }
    });
  }
}
