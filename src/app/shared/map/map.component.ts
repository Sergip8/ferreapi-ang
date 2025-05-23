import { AfterViewInit, Component, Input, Inject, PLATFORM_ID, OnDestroy } from "@angular/core";
import { isPlatformBrowser, NgIf } from '@angular/common';

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
    isPlatformBrowser = false
  private map: any; 
  private L!: typeof LeafletType;

  private _markers!: Marker[];
  private mapInitialized = false;

  @Input()
  set markers(markers: Marker[]) {
    this._markers = markers;
    if (this.mapInitialized && this._markers !== null) {
      // update the map whenever the markers change
      this.loadMarkers();
    }
  }
  get markers() {
    return this._markers;
  }

  // Inyectamos PLATFORM_ID para verificar si estamos en el navegador o en el servidor
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

   async ngAfterViewInit(){
   
    if (isPlatformBrowser(this.platformId)) {
        // Retraso para asegurarnos que el DOM esté completamente listo
        setTimeout(async () => {
         await this.initializeLeaflet().then(() => {
            this.initMap();
          });
        }, 200);
      }
  }
  ngOnDestroy(): void {
    // Limpiamos el mapa cuando el componente se destruye
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.mapInitialized = false;
    }
  }

  // Método para cargar Leaflet dinámicamente
  private async initializeLeaflet(): Promise<void> {
    try {
      // Importamos Leaflet dinámicamente solo en el navegador
      const L = await import('leaflet');
      this.L = L;
      
      // Configuramos el icono por defecto
      const iconRetinaUrl = "assets/images/marker-icon-2x.png";
      const iconUrl = "assets/images/marker-icon.png";
      const shadowUrl = "assets/images/marker-shadow.png";
      
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
      
      // Establecemos el icono por defecto
      L.Marker.prototype.options.icon = iconDefault;
    } catch (error) {
      console.error("Error al cargar Leaflet", error);
    }
  }

  private initMap(): void {
    if (!this.L) return;
    
    const L = this.L;
    


    // Verificamos si hay un mapa existente y lo eliminamos
    if (this.map) {
      this.map.remove();
      this.map = null;
    }
    
    // Verificamos si el elemento del mapa existe en el DOM
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Elemento del mapa no encontrado en el DOM');
      return;
    }
    let center: [number, number] = [4.65, -74.1]; // Bogotá por defecto
    let zoom = 17; 
    if (this.markers && this.markers.length === 1) {
        center = [this.markers[0].lat, this.markers[0].lon];
      }
    // Inicializamos el mapa
    try {
      this.map = L.map("map", {
        center: center, // Centro de Bogotá
        zoom: zoom
      });
    } catch (e) {
      console.error('Error al inicializar el mapa:', e);
      return;
    }


    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    );

    tiles.addTo(this.map);
    this.mapInitialized = true;

    // Cargamos los marcadores si están disponibles
    if (this.markers && this.markers.length > 0) {
      this.loadMarkers();
    }
  }

  private loadMarkers() {
    if (!this.mapInitialized || !this.map || !this.L) {
      return;
    }

    // Limpiar marcadores existentes
    if (this.map.clearLayers) {
      this.map.eachLayer((layer: any) => {
        if (layer instanceof this.L.Marker) {
          this.map.removeLayer(layer);
        }
      });
    }

    // Añadir nuevos marcadores
    for (let i = 0; i < this.markers.length; ++i) {
      const marker = this.markers[i];
      const mapMarker = this.L.marker([marker.lat, marker.lon]);

      mapMarker.addTo(this.map);
    }
  }
}
