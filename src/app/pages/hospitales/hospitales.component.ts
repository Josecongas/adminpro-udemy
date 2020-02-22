import { Component, OnInit } from "@angular/core";
import { HospitalService } from "../../services/hospital/hospital.service";
import { Hospital } from "../../models/hospital.model";
import { map, debounceTime } from "rxjs/operators";
import { fromEvent } from "rxjs/observable/fromEvent";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";

declare var swal: any;

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html"
})
export class HospitalesComponent implements OnInit {
  hospital: Hospital = { nombre: "" };
  hospitales: Hospital[] = [];
  desde: number = 0;

  cargando: boolean = true;
  topeRegistros: boolean = false;

  totalRegistros: number = 0;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarHospitales();
    });

    this.cargando = true;
    this._hospitalService.cargarToken();
    // Seleccionamos el input en el documento
    const input = document.getElementById("buscarHospital");

    // En el evento indicado para el elemento seleccionado ejecutamos los pipes y luego el subscribe
    fromEvent(input, "input")
      .pipe(
        // Tomamos las letras ingresadas en el input
        map((k: KeyboardEvent) => {
          this.cargando = true;
          return k.target["value"];
        }),
        // Seleccionamos un tiempo en milisegundos antes de continuar la ejecución luego de que se presionó la última letra,
        // si hay cambios en el input vuelve a empezar a contar
        debounceTime(1000)
        // Ahora si ejecutamos la busqueda del usuario con el total de letras en el input
        // luego de que se dejara de escribir por 1 segundo
      )
      .subscribe(val => {
        if (val !== "") {
          this._hospitalService
            .buscarHospitales(val)
            .subscribe((hospitales: Hospital[]) => {
              this.hospitales = hospitales;
              this.cargando = false;
            });
        } else {
          this.cargarHospitales();
          return;
        }
      });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal("hospitales", id);
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService
      .cargarHospitales(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
      });
  }

  logHospitales() {
    console.log(this.hospitales);
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;

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
    this.cargarHospitales();
  }

  borrarHospital(hospital: Hospital) {
    console.log("HOSPITAL: " + hospital._id);

    swal
      .fire({
        title: "¿Esta seguro?",
        text: "Esta a punto de borrar a " + hospital.nombre,
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
      .then(borrar => {
        if (borrar) {
          this._hospitalService
            .borrarHospital(hospital._id)
            .subscribe(borrado => {
              this.cargarHospitales();
            });
        }
      });
  }

  crearHospital() {
    swal
      .fire("Escribe el nombre del hospital: ", {
        content: "input"
      })
      .then((nombre: string) => {
        this.hospital.nombre = nombre;
        this.hospital.img = "/img/usuarios/xxx";
        this._hospitalService.crearHospital(this.hospital).subscribe();
      });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }
}
