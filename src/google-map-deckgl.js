import { mapStyles } from './mapStyles';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';

export class GoogleMapDeckGL {
    constructor() {
        this.api;
        this.map;
        this.overlay;
    }

    loadScript() {
        const GOOGLE_MAPS_API_KEY = process.env.GoogleMapsAPIKey;
        const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = GOOGLE_MAPS_API_URL;
        head.appendChild(script);
        return new Promise(resolve => {
            script.onload = resolve;
        });
    }

    async initMapWithOverlay(options) {
        await this.loadScript();
        this.api = google.maps;
        this.overlay = new GoogleMapsOverlay();
        this.map = new this.api.Map(document.getElementById('map'), {
            center: options.center,
            zoom: options.zoom,
            styles: mapStyles
        });
        this.overlay.setMap(this.map);
    }

    setMap(map_options) {
        this.map.setCenter(map_options.center);
        this.map.setZoom(map_options.zoom);
    }

    setLayer(deckgl_layers) {
        this.overlay.setProps({ layers: deckgl_layers });
    }
}