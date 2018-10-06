import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { map, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  topeRegistros: boolean = false;
  constructor(private _usuarioService: UsuarioService,
    private _modalUploadService: ModalUploadService) {}

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
    .subscribe( resp => {
      this.cargarUsuarios();
    });

    this.cargando = true;

    // Seleccionamos el input en el documento
    const input = document.getElementById('buscarUsuario');

    // En el evento indicado para el elemento seleccionado ejecutamos los pipes y luego el subscribe
    fromEvent(input, 'input')
      .pipe(
        // Tomamos las letras ingresadas en el input
        map((k: KeyboardEvent) => {
          this.cargando = true;
          return k.target['value'];
        }),
        // Seleccionamos un tiempo en milisegundos antes de continuar la ejecución luego de que se presionó la última letra,
        // si hay cambios en el input vuelve a empezar a contar
        debounceTime(1000)
        // Ahora si ejecutamos la busqueda del usuario con el total de letras en el input
        // luego de que se dejara de escribir por 1 segundo
      )
      .subscribe(val => {
        if (val !== '') {
          this._usuarioService
            .buscarUsuarios(val)
            .subscribe((usuarios: Usuario[]) => {
              this.usuarios = usuarios;
              this.cargando = false;
            });
        } else {
          this.cargarUsuarios();
          return;
        }
      });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;

    if (this.desde + 5 < this.totalRegistros) {
      this.topeRegistros = false;
    } else {
      this.topeRegistros = true;
    }
    this.cargarUsuarios();
  }

  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this._usuarioService.usuario._id) {
      swal(
        'Error borrando el usuario',
        'No puede borrar el usuario actual',
        'error'
      );
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(borrado => {
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
