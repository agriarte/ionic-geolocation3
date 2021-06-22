//desde docu oficial Capacitor buscar para instalar Geolocation.
//npm audit npm install @capacitor/geolocation
//Mucha atención. Existe Geolocation Nativo y de Capacitor. Usar uno o otro tiene
//diferencias y saldrán errores en el código


import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //parecido a getElementbyId. En la vista HTML se refiere a #map no al id.
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  posicion: string;//para interpolar en la vista

  //como Geolocation es estático no hace falta declararlo en el constructor
  //ejemplos docu oficial, en cambio, lo hace.
  constructor() { }

  ionViewDidEnter() {
    this.getLocation();
  }

  async getLocation() {
    const coordenates = await Geolocation.getCurrentPosition();
    this.posicion = 'Latitud: ' + coordenates.coords.latitude + ' Longitud: ' + coordenates.coords.longitude
    console.log(this.posicion);
  }

}
