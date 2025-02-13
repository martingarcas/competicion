import { Routes } from '@angular/router';
import { ListaCompetidoresComponent } from './lista-competidores/lista-competidores.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [

	{path: "", component:ListaCompetidoresComponent, pathMatch:"full"},
	{path: "login", component:LoginComponent, pathMatch:"full"},
	{path: "experto", component:ListaCompetidoresComponent, pathMatch:"full"},
	{path: "admin", component:AdminComponent, pathMatch:"full"}
];
