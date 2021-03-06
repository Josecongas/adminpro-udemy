import { UsuarioService } from './../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario.model';
import { ComponentFactoryBoundToModule } from '@angular/core/src/linker/component_factory_resolver';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: Boolean = false;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';

    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '807103753773-9pjr9qcfpqrlb5l7id85kf279lmsb1s4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
    init_plugins();

  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService
        .loginGoogle(token)
        .subscribe(resp => this.router.navigate(['/dashboard']));
    });
  }

  ingresar(Forma: NgForm) {
    if (Forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, Forma.value.email, Forma.value.password);

    this._usuarioService
      .login(usuario, Forma.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']));
       init_plugins();
    // this.router.navigate(['/dashboard']);
  }
}
