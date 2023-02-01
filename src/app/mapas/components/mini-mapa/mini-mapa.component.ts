import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styleUrls: ['./mini-mapa.component.scss'],
})
export class MiniMapaComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;

  @Input() lngLat: [number, number] = [0, 0];

  constructor() {}

  ngAfterViewInit(): void {
    const mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false,
    });

    new mapboxgl.Marker().setLngLat(this.lngLat).addTo(mapa);
  }
}
