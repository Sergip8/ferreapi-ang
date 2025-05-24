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
      }, 100); // Aumentamos el delay para asegurar que el DOM esté listo
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
      const L = await import('leaflet');
      this.L = L;
      
      // Configuración de iconos con CDN como fallback
      let iconRetinaUrl = "/assets/images/marker-icon-2x.png";
      let iconUrl = "/assets/images/marker-icon.png";
      let shadowUrl = "/assets/images/marker-shadow.png";

      // Fallback a CDN si los assets locales fallan
      try {
        // Verificar si los assets locales existen
        await this.checkAssetExists(iconUrl);
      } catch {
        // Usar CDN como fallback
        iconRetinaUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png";
        iconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png";
        shadowUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png";
      }
      
      const iconDefault = L.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
      
      L.Marker.prototype.options.icon = iconDefault;
    } catch (error) {
      console.error("Error al cargar Leaflet:", error);
      throw error;
    }
  }

  private checkAssetExists(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject();
      img.src = url;
    });
  }

  private initMap(): void {
    if (!this.L || !this.isPlatformBrowser) return;
    
    const L = this.L;
    
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Elemento del mapa no encontrado en el DOM');
      return;
    }

    let center: [number, number] = [4.65, -74.1]; 
    let zoom = 17; 
    
    if (this.markers && this.markers.length === 1) {
      center = [this.markers[0].lat, this.markers[0].lon];
    }

    try {
      this.map = L.map("map", {
        center: center, 
        zoom: zoom,
        zoomControl: true,
        attributionControl: true
      });

      const tiles = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          minZoom: 3,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      );

      tiles.addTo(this.map);
      this.mapInitialized = true;

      if (this.markers && this.markers.length > 0) {
        this.loadMarkers();
      }
    } catch (e) {
      console.error('Error al inicializar el mapa:', e);
    }
  }

  private loadMarkers() {
    if (!this.mapInitialized || !this.map || !this.L || !this.isPlatformBrowser) {
      return;
    }

    // Limpiar marcadores existentes
    this.map.eachLayer((layer: any) => {
      if (layer instanceof this.L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Añadir nuevos marcadores
    this.markers.forEach(marker => {
      const mapMarker = this.L.marker([marker.lat, marker.lon]);
      mapMarker.addTo(this.map);
    });
  }
}