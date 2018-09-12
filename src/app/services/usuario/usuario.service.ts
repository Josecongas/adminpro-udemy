import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;


  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.cargarStorage();
   }

   estaLogueado(): boolean {
    if (this.token) {
      return true;
    } else {
      return false;
    }
   }

   guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
   }

   cargarStorage() {
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.usuario = JSON.parse(localStorage.getItem('usuario'));
     } else {
       this.token = '';
       this.usuario = null;
     }
   }

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
    .map((resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario)
      return true;
    });
  }

   login( usuario: Usuario, recordar: Boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

      let url = URL_SERVICIOS + '/login';
      return this.http.post(url, usuario)
        .map( (resp: any) => {
            this.guardarStorage(resp.id, resp.token, resp.usuario);

            return true;
        })
   }

  crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post( url, usuario )
      .map( (resp: any) => {

        swal('Usuario creado');
        return resp.usuario;
      })
  }

}
