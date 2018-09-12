import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

  }

  canActivate(): boolean {
    
    console.log('LOGIN GUARD');

    if (this._usuarioService.estaLogueado() === true) {
    console.log('ESTA LOGUEADO');
    return true;
    } else {
    console.log('BLOQUEADO POR EL GUARD');
    this.router.navigate(['/login']);
    return false;       
    }
  }
}
