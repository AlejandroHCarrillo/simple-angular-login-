import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,
              private router:Router){}

  canActivate():boolean {
    console.log("Guardia de seguridad trabajando");
    console.log(`¿Esta Autenticado?: ${this.auth.estaAutenticado()}`);
    console.log(`¿Esta userToken?: ${this.auth.userToken}`);
    console.log(`¿Esta Autenticado usando userToken?: ${this.auth.userToken?true:false}`);
    if (this.auth.estaAutenticado()){
      return true;
    } else{
      this.router.navigateByUrl("/login");
      return false;
    }
  }

}
