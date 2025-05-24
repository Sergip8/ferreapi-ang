import { AfterViewInit, Component, Input, Inject, PLATFORM_ID, OnDestroy } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';

// Importación condicional para Leaflet
import type * as LeafletType from "leaflet";
import { Marker } from "../../models/map";

@Component({
  selector: "app-maps",
  imports: [],
  template: `
  <div id="map" class="w-full h-full"></div>
  `,
  styles: [""]
})
export class MapsComponent implements AfterViewInit, OnDestroy {
  isPlatformBrowser = false;
  private map: any; 
  private L!: typeof LeafletType;

  private _markers!: Marker[];
  private mapInitialized = false;

  @Input()
  set markers(markers: Marker[]) {
    this._markers = markers;
    if (this.mapInitialized && this._markers !== null) {
      this.loadMarkers();
    }
  }
  get markers() {
    return this._markers;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isPlatformBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (this.isPlatformBrowser) {
      setTimeout(() => {
        this.initializeLeaflet().then(() => {
          this.initMap();
        }).catch(error => {
          console.error('Error inicializando Leaflet:', error);
        });
      }, 200);
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.mapInitialized = false;
    }
  }

  private async initializeLeaflet(): Promise<void> {
    try {
      // Usar importación dinámica con múltiples fallbacks
      let leafletModule: any;
      
      try {
        leafletModule = await import('leaflet');
      } catch (e) {
        console.warn('Importación directa de leaflet falló, intentando CDN');
        await this.loadLeafletFromCDN();
        this.L = (window as any).L;
        return;
      }

      // Manejar diferentes estructuras de módulo
      this.L = leafletModule.default || leafletModule;
      
      // Verificar que se cargó correctamente
      if (!this.L?.map) {
        throw new Error('Leaflet no se cargó correctamente');
      }

      // Configurar iconos solo si están disponibles
      this.configureIcons();
      
    } catch (error) {
      console.error("Error al cargar Leaflet:", error);
      throw error;
    }
  }

  private async loadLeafletFromCDN(): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).L) {
        resolve();
        return;
      }

      // Cargar CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      // Cargar JS
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Error cargando Leaflet desde CDN'));
      document.head.appendChild(script);
    });
  }

  private configureIcons(): void {
    if (!this.L?.icon) {
      console.warn('L.icon no disponible, saltando configuración de iconos');
      return;
    }

    try {
      const iconDefault = this.L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      
      if (this.L.Marker?.prototype) {
        this.L.Marker.prototype.options.icon = iconDefault;
      }
    } catch (error) {
      console.warn('Error configurando iconos:', error);
    }
  }

  private initMap(): void {
    if (!this.L?.map || !this.isPlatformBrowser) {
      console.error('Leaflet no está disponible o no estamos en el navegador');
      return;
    }
    
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Elemento del mapa no encontrado');
      return;
    }

    let center: [number, number] = [4.65, -74.1]; 
    let zoom = 17; 
    
    if (this.markers?.length === 1) {
      center = [this.markers[0].lat, this.markers[0].lon];
    }

    try {
      this.map = this.L.map("map", {
        center: center, 
        zoom: zoom,
        zoomControl: true,
        attributionControl: true
      });

      const tiles = this.L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      );

      tiles.addTo(this.map);
      this.mapInitialized = true;

      if (this.markers?.length > 0) {
        this.loadMarkers();
      }
    } catch (e) {
      console.error('Error al inicializar el mapa:', e);
    }
  }

  private loadMarkers(): void {
    if (!this.mapInitialized || !this.map || !this.L?.marker || !this.isPlatformBrowser) {
      return;
    }

    // Limpiar marcadores existentes
    this.map.eachLayer((layer: any) => {
      if (layer instanceof this.L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Añadir nuevos marcadores
    this.markers?.forEach(marker => {
      try {
        const mapMarker = this.L.marker([marker.lat, marker.lon]);
        mapMarker.addTo(this.map);
      } catch (error) {
        console.error('Error añadiendo marcador:', error);
      }
    });
  }
}