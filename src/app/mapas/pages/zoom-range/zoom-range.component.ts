import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.scss'],
})
export class ZoomRangeComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map;

  constructor() {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-74.16428974815396, 4.681994280019149],
      zoom: 16,
    });
  }

  zoomOut(): void {
    this.mapa.zoomOut();
    console.log('zoomOut', this.divMapa);
  }

  zoomIn(): void {
    this.mapa.zoomIn();
  }
}
