import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

subscription: Subscription;


  constructor() {
    this.subscription = this.regresaObservable()
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.error('Error: ', error),
        () => console.log('Fin del observable')
      );
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('Cerrando página');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    const obs = new Observable<any>(observer => {
      let contador = 0;

      const intervalo = setInterval(() => {
        contador += 1;

        const salida = {
          valor: contador
        };


        observer.next(salida);
        // if (contador === 3) {
        //   clearInterval(contador);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   // clearInterval(contador);
        //   observer.error('Error en el código');
        // }
      }, 1000);
    }).pipe(
      map ( resp => resp.valor),
      filter ( (valor, index) => {
        if ( valor % 2 === 1) {
          // Impar
          return true;
        } else {
          // PAR
          return false;
        }
      })
    );
    return obs;
  }
}
