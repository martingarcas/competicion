import { Routes } from '@angular/router';
import { ListaCompetidoresComponent } from './components/lista-competidores/lista-competidores.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { guardianAdminGuard } from './autorizacion/guardian-admin.guard';
import { guardianExpertoGuard } from './autorizacion/guardian-experto.guard';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { EspecialidadFormComponent } from './components/admin/especialidad-form/especialidad-form.component';
import { ListaEspecialidadesComponent } from './components/admin/lista-especialidades/lista-especialidades.component';

export const routes: Routes = [

	{path: "", component:ListaCompetidoresComponent, pathMatch:"full"},
	{path: "login", component:LoginComponent, pathMatch:"full"},
	{path: "experto", component:ListaCompetidoresComponent, canActivate:[guardianExpertoGuard], pathMatch:"full"},
	{path: "admin", component:AdminComponent, canActivate:[guardianAdminGuard], pathMatch:"full"},
	{ path: 'admin/crear-experto', component: RegistroComponent, canActivate: [guardianAdminGuard], pathMatch: 'full' },
	{ path: "admin/crear-especialidad", component: EspecialidadFormComponent, canActivate: [guardianAdminGuard], pathMatch: "full" },
	{ path: "admin/especialidades", component: ListaEspecialidadesComponent, canActivate: [guardianAdminGuard], pathMatch: "full" }
];
