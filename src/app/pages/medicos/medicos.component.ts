import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { map, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;


@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];

  cargando: boolean = true;

  topeRegistros: boolean = false;
  totalRegistros: number = 0;

  constructor(
    public _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion.subscribe(resp => {
      this.cargarMedicos();
    });

    this.cargando = true;

    // Seleccionamos el input en el documento
    const input = document.getElementById('buscarMedico');

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
        // Ahora si ejecutamos la busqueda del medico con el total de letras en el input
        // luego de que se dejara de escribir por 1 segundo
      )
      .subscribe(val => {
        if (val !== '') {
          this._medicoService
            .buscarMedicos(val)
            .subscribe((medicos: Medico[]) => {
              this.medicos = medicos;
              this.cargando = false;
              console.log('HAY ALGO');
            });
        } else {
          console.log('INICIO DE MEDICOS' + this.medicos);
          this.cargarMedicos();
          return;
        }
      });

  }

  cargarMedicos() {
    this.cargando = true;

    this._medicoService.cargarMedicos().subscribe((resp: any) => {
      console.log('RESPUESTA: ' + resp);
      this.totalRegistros = resp.total;
      this.medicos = resp.medicos;
      this.cargando = false;
    });
  }

  prueba() {
    console.log('Medico 2: ' + JSON.stringify(this.medicos[2].img));
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('medicos', id);
  }

  borrarMedico(medico: Medico) {

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      if (borrar) {
        this._medicoService
          .borrarMedico(medico._id)
          .subscribe(borrado => {
            this.cargarMedicos();
          });
      }
    });
  }
}
