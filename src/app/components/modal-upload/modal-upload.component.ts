import { ModalUploadService } from "./modal-upload.service";
import { SubirArchivoService } from "./../../services/subir-archivo/subir-archivo.service";
import { Component, OnInit } from "@angular/core";
import swal from "sweetalert2";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      swal.fire(
        "Solo imágenes",
        "El archivo seleccionado NO es una imagen",
        "error"
      );
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => (this.imagenTemp = reader.result.toString());
  }

  subirImagen() {
    this._subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this._modalUploadService.tipo,
        this._modalUploadService.id
      )
      .then(resp => {
        console.log(this.imagenSubir);
        console.log(this._modalUploadService.tipo);
        console.log(this._modalUploadService.id);

        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch(err => {
        console.log("Error en la carga... ");
      });
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }
}
