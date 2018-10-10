import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable()
export class MedicoService {
  medico: Medico;
  totalMedicos: number;
  token: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {}

  cargarMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url)
    .map((resp: any) => resp.medico);
  }

  cargarMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url);
  }

  buscarMedicos(termino: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medico;
      })
    );
  }

  guardarMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // Actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, medico).map((resp: any) => {
        swal('Médico actualizado', medico.nombre, 'success');
        return resp.medico;
      });

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medico).map((resp: any) => {
        swal('Médico creado', medico.nombre, 'success');
        return resp.medico;
      });

    }


  }


  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).map(resp => {
      swal(
        'Medico borrado',
        'El médico a sido eliminado correctamente',
        'success'
      );
      return true;
    });
  }
}
