import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/auth/login/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const guardianAdminGuard: CanActivateFn = (route, state) => {
  

  let respuesta:boolean = false; 
  let service = inject(LoginService);
  let router = inject(Router);

  if (service.getPerfil() == "admin") {
    respuesta = true;
  } else {
    router.navigate(["login"]);
  }

  return respuesta;

};


