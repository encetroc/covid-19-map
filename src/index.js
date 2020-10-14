import { GoogleMapsOverlay } from '@deck.gl/google-maps'
import { ScatterplotLayer } from '@deck.gl/layers'
import { HeatmapLayer } from '@deck.gl/aggregation-layers'
import { mapStyles } from './map-styles';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

// Set your Google Maps API key here or via environment variable
const GOOGLE_MAPS_API_KEY = process.env.GoogleMapsAPIKey; // eslint-disable-line
const GOOGLE_MAPS_API_URL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=visualization&v=3.39`;

function loadScript(url) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    const head = document.querySelector('head');
    head.appendChild(script);
    return new Promise(resolve => {
        script.onload = resolve;
    });
}

loadScript(GOOGLE_MAPS_API_URL).then(() => {
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 46.2276, lng: 2.2137 },
        zoom: 6,
        styles: mapStyles
    });

    const promiseCountries = fetch('https://www.trackcorona.live/api/countries')
        .then(res => res.json())
        .then(data => data.data)

    const promiseProvinces = fetch('https://www.trackcorona.live/api/provinces')
        .then(res => res.json())
        .then(data => data.data)

    const promiseCities = fetch('https://www.trackcorona.live/api/cities')
        .then(res => res.json())
        .then(data => data.data)

    const promiseTravel = fetch('https://www.trackcorona.live/api/travel')
        .then(res => res.json())
        .then(data => data.data)

    Promise.all([
        promiseCountries,
        promiseProvinces,
        promiseCities,
        promiseTravel
    ]).then((values) => {
        document.body.classList.toggle('loading-open')

        const btnCountries = document.getElementById('btnCountries')
        const btnProvinces = document.getElementById('btnProvinces')
        const btnCitiesScatter = document.getElementById('btnCitiesScatter')
        const btnCitiesHeatmap = document.getElementById('btnCitiesHeatmap')

        const heatmap = () => new HeatmapLayer({
            id: 'heatmap',
            data: values[2],
            getPosition: d => [d.longitude, d.latitude],
            getWeight: d => d.confirmed,
            radiusPixels: 20,
            intensity: 10,
        })

        const scatterplot = () => new ScatterplotLayer({
            id: 'scatter',
            data: values[2],
            opacity: 0.8,
            filled: true,
            radiusMinPixels: 3,
            radiusMaxPixels: 20,
            pickable: true,
            getPosition: d => [d.longitude, d.latitude],
            getRadius: d => d.confirmed,
            getFillColor: [200, 0, 40, 150],
            onHover: ({ object, x, y }) => {
                const el = document.getElementById('tooltip')
                if (object) {
                    const { confirmed, dead, recovered } = object
                    console.log(object)
                    el.innerHTML = `<h1> ${confirmed} Dead: ${dead} </h1>`
                    el.style.display = 'block'
                    el.style.position = 'absolute'
                    el.style.background = '#fff'
                    el.style.zIndex = 3
                    el.style.opacity = 0.8
                    el.style.left = x + 10 + 'px'
                    el.style.top = y + 10 + 'px'
                } else {
                    el.style.opacity = 0.0
                    console.log('nothing')
                }
            }
        })

        const overlay = new GoogleMapsOverlay({ layers: [] })
        overlay.setMap(map)

        btnCitiesHeatmap.addEventListener('click', () => {
            overlay.setProps({ layers: [heatmap()] })
        })

        btnCitiesScatter.addEventListener('click', () => {
            overlay.setProps({ layers: [scatterplot()] })
        })

    });
});