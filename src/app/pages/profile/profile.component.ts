import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../services/usuario/usuario.service";
import swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuario.role = "ADMIN_ROLE";

    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

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

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}
