import { Component, OnInit } from '@angular/core';
import { ParticipanteService } from '../../participante.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-competidores',
  imports: [CommonModule],
  templateUrl: './lista-competidores.component.html',
  styleUrl: './lista-competidores.component.css'
})
export class ListaCompetidoresComponent implements OnInit{

  participantes: any[] = [];

  constructor(private service:ParticipanteService) {  }

  ngOnInit(): void {
    this.service.getParticipantes().subscribe((data) => {
      this.participantes = data;
    }, error => {
      console.error('Error al cargar los participantes', error);
    });
  }

}
