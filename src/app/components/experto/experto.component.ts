import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-experto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experto.component.html',
  styleUrls: ['./experto.component.css']
})
export class ExpertoComponent {
  constructor(private router: Router) {}

  goTo(ruta: string) {
    this.router.navigate([`/experto/${ruta}`]);
  }
  
}
