import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { SubirArchivoService } from "./../subir-archivo/subir-archivo.service";
import { Hospital } from "../../models/hospital.model";
import { URL_SERVICIOS } from "../../config/config";
import { map } from "rxjs/operators";
import swal from "sweetalert2";

@Injectable()
export class HospitalService {
  hospital: Hospital;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {}

  cargarToken() {
    this.token = localStorage.getItem("token");
  }

  cargarHospitales(desde: number) {
    const url = URL_SERVICIOS + "/hospital?desde=" + desde;
    return this.http.get(url);
  }

  crearHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + "/hospital";
    url += "?token=" + this.token;

    return this.http.post(url, hospital).map((resp: any) => {
      swal.fire("Hospital creado", hospital.nombre, "success");
      return resp.hospital;
    });
  }

  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService
      .subirArchivo(archivo, "hospitales", id)
      .then((resp: any) => {
        this.hospital.img = resp.hospital.img;

        swal.fire("Imagen actualizada", this.hospital.nombre, "success");
      })
      .catch(resp => {});
  }

  buscarHospitales(termino: string) {
    const url = URL_SERVICIOS + "/busqueda/coleccion/hospital/" + termino;
    return this.http.get(url).pipe(
      map((resp: any) => {
        console.log(resp);
        console.log(resp.hospital);
        return resp.hospital;
      })
    );
  }

  obtenerHospital(id: string) {
    const url = URL_SERVICIOS + "/hospital/" + id;
    return this.http.get(url).map((resp: any) => resp.hospital);
  }

  borrarHospital(id: string) {
    let url = URL_SERVICIOS + "/hospital/" + id;
    url += "?token=" + this.token;

    return this.http.delete(url).map(resp => {
      swal.fire(
        "Hospital borrado",
        "El hospital ha sido eliminado correctamente",
        "success"
      );
      return true;
    });
  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + "/hospital/" + hospital._id;
    url += "?token=" + this.token;
    return this.http.put(url, hospital).map((resp: any) => {
      swal.fire("Hospital actualizado", hospital.nombre, "success");
      return true;
    });
  }
}
