import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable()
export class SidebarService {

  menu: any = [];

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.menu = this._usuarioService.menu;
  }

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'Progreso', url: '/progress' },
  //       { titulo: 'Gráficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'Rxjs', url: '/rxjs' }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Médicos', url: '/medicos' }
  //     ]
  //   }
  // ];
}
