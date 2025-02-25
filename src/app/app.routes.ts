import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { guardianAdminGuard } from './autorizacion/guardian-admin.guard';
import { guardianExpertoGuard } from './autorizacion/guardian-experto.guard';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { EspecialidadFormComponent } from './components/admin/especialidad-form/especialidad-form.component';
import { ListaEspecialidadesComponent } from './components/lista-especialidades/lista-especialidades.component';
import { ParticipanteComponent } from './components/experto/participante/participante.component';
import { ExpertoComponent } from './components/experto/experto.component';
import { ParticipanteFormComponent } from './components/experto/participante-form/participante-form.component';
import { ListaExpertosComponent } from './components/admin/lista-expertos/lista-expertos.component';
import { PruebaFormComponent } from './components/experto/prueba-form/prueba-form.component';
import { ListaPruebasComponent } from './components/experto/lista-pruebas/lista-pruebas.component';

export const routes: Routes = [

	{path: "", component:ParticipanteComponent, pathMatch:"full"},
	{path: "login", component:LoginComponent, pathMatch:"full"},
	{path: "admin", component:AdminComponent, canActivate:[guardianAdminGuard], pathMatch:"full"},
	{ path: 'admin/crear-experto', component: RegistroComponent, canActivate: [guardianAdminGuard], pathMatch: 'full' },
	{ path: "admin/crear-especialidad", component: EspecialidadFormComponent, canActivate: [guardianAdminGuard], pathMatch: "full" },
	{ path: "admin/especialidades", component: ListaEspecialidadesComponent, canActivate: [guardianAdminGuard], pathMatch: "full" },
	{ path: "admin/participantes", component: ParticipanteComponent, canActivate: [guardianAdminGuard], pathMatch: "full" },
	{ path: 'admin/expertos', component: ListaExpertosComponent, canActivate: [guardianAdminGuard] },
	{ path: "experto", component: ExpertoComponent, canActivate: [guardianExpertoGuard], pathMatch: "full" },
	{ path: "experto/participantes", component: ParticipanteComponent, canActivate: [guardianExpertoGuard], pathMatch: "full" },
	{ path: 'experto/crear-participante', component: ParticipanteFormComponent, canActivate: [guardianExpertoGuard], pathMatch: "full" },
	{ path: "experto/crear-prueba", component: PruebaFormComponent, canActivate: [guardianExpertoGuard], pathMatch: "full"},
	{ path: "experto/pruebas", component: ListaPruebasComponent, canActivate: [guardianExpertoGuard], pathMatch: "full"},
	{ path: "experto/especialidades", component: ListaEspecialidadesComponent, canActivate: [guardianExpertoGuard], pathMatch: "full" }
];
