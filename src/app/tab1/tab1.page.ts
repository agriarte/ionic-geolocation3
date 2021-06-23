//desde docu oficial Capacitor buscar para instalar Geolocation.
//npm audit npm install @capacitor/geolocation
//Mucha atención. Existen 2 plugins Geolocation, el Nativo y el de Capacitor. Usar uno o otro tiene
//diferencias y saldrán errores en el código. Este ejemplo usa el de Capacitor

//Para Googlemaps también hay varias opciones. Este ejemplo usa GoogleMaps JavaScript Api. Se tiene que habilitar desde
// https://console.cloud.google.com en Biblioteca de Api.
//En archivo index.html encima de </head> agregar
//<script src='https://maps.googleapis.com/maps/api/js?libraries=places&key=MI_KEY_AQUI'></script>


import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
//Atencion al import de ToastController, tiene que ser este: from '@ionic/angular';
import { ToastController } from '@ionic/angular';

//si no reconoce google declararla previamente
declare const google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //parecido a getElementbyId. En la vista HTML se refiere a #map no al id.
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  map: any;


  posicion: string;//para interpolar en la vista

  //como Geolocation es estático no hace falta declararlo en el constructor
  //ejemplos docu oficial, en cambio, lo hace.
  constructor(public toastController: ToastController) { }

  ionViewDidEnter() {
    this.getLocation();
  }

  // con async y await
  // async getLocation() {
  //   const coordenates = await Geolocation.getCurrentPosition();
  //   this.posicion = 'Latitud: ' + coordenates.coords.latitude + ' Longitud: ' + coordenates.coords.longitude
  //   console.log(this.posicion);
  // }

  //con promesas es mas seguro. Hasta que no se reciben datos no ejecuta el método
  getLocation() {
    Geolocation.getCurrentPosition().then((coordenadas) => {
      this.posicion = 'Latitud: ' + coordenadas.coords.latitude + ' Longitud: ' + coordenadas.coords.longitude;
      this.presentToast (this.posicion);
      //llamada al googlemap
      this.loadMap(coordenadas);
    });
  }

  async presentToast(txt: string) {
    const toast = await this.toastController.create({
      message: txt,
      duration: 2000
    });
    toast.present();
  }

  loadMap(coordinates) {
    const latLng = new google.maps.LatLng(
      coordinates.coords.latitude,
      coordinates.coords.longitude
    );
    const mapOptions = {
      center: latLng,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(this.map);
  }

  addMarker(map) {
    const marker = new google.maps.Marker({
      map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter(),
    });
  }


}
