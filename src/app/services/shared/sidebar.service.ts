import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  constructor() { }

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'dashboard', url: '/dashboard'},
        {titulo: 'progressBar', url: '/progress'},
        {titulo: 'gráficas', url: '/graficas1'}
      ]

    }
  ];

}
