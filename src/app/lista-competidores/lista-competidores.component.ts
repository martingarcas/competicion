import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-competidores',
  imports: [],
  templateUrl: './lista-competidores.component.html',
  styleUrl: './lista-competidores.component.css'
})
export class ListaCompetidoresComponent {

  listaCompetidores:any[];

  constructor() {
    this.listaCompetidores=[
      {id:1, nombre:"Martín", especialidad:"Maquetación"},
      {id:1, nombre:"Manu", especialidad:"Base de datos"},
      {id:1, nombre:"Fernando", especialidad:"Registros"}
    ]
  }

}
