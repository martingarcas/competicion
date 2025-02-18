import { Routes } from '@angular/router';
import { ListaCompetidoresComponent } from './lista-competidores/lista-competidores.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { guardianAdminGuard } from './autorizacion/guardian-admin.guard';
import { guardianExpertoGuard } from './autorizacion/guardian-experto.guard';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [

	{path: "", component:ListaCompetidoresComponent, pathMatch:"full"},
	{path: "login", component:LoginComponent, pathMatch:"full"},
	{path: "experto", component:ListaCompetidoresComponent, canActivate:[guardianExpertoGuard], pathMatch:"full"},
	{path: "admin", component:AdminComponent, canActivate:[guardianAdminGuard], pathMatch:"full"},
	{ path: 'admin/register', component: RegistroComponent, canActivate: [guardianAdminGuard], pathMatch: 'full' }
];
