import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.scss'],
})
export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;

  zoomLevel: number = 15;
  center: [number, number] = [-74.16428974815396, 4.681994280019149];

  //* ARREGLO DE MARCADORES
  marcadores: MarcadorColor[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.center,
      zoom: this.zoomLevel,
    });

    this.leerLocalStorage();
    /*
    //*PERSONALIZAR MARCADOR
    const markerHtml: HTMLElement = document.createElement('div)

    markerHtml.innerHTML = 'Hola Mundo'

    const marker = new mapboxgl.Marker({
      element: markerHtml
    })
*/

    /*  const marker = new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa); */
  }

  agregarMarcador(): void {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true, //* PARA MOVERLO
      color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({ marker: nuevoMarcador, color });

    this.guardarMarcadoresLocalStorage();

    //* MOVIMIENTO DEL MARCADOR
    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });
  }

  irMarcador(marker: mapboxgl.Marker): void {
    this.mapa.flyTo({
      center: marker.getLngLat(),
    });
  }

  guardarMarcadoresLocalStorage(): void {
    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach((m) => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro: [lng, lat],
      });
    });

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));
  }

  leerLocalStorage(): void {
    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const lngLatArr: MarcadorColor[] = JSON.parse(
      localStorage.getItem('marcadores')!
    );

    lngLatArr.forEach((m) => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color,
      });

      //* MOVIMIENTO DEL MARCADOR
      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      });
    });
  }

  borrarMarcador(index: number): void {
    this.marcadores[index].marker?.remove();

    this.marcadores.splice(index, 1);

    this.guardarMarcadoresLocalStorage();
  }
}
