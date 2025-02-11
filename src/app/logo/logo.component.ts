import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent {

  @Input() variablePadre:any; 
  constructor(private route:Router) {

  }
  
  goToHome() {
    this.route.navigate(['/']);
  }

}
