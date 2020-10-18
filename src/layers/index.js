import {TrackCoronaScatterplotLayer} from './trackCoronaScatterplot'

const CountriesScatterplot =  new TrackCoronaScatterplotLayer(
    'https://www.trackcorona.live/api/countries',
    {name: 'Countries', img: require('../assets/countries.png')},
    'covid-countries-scatterplot',
    {
        center: {lat: 46.2276, lng: 2.2137},
        zoom: 5
    }
)

const ProvincesScatterplot =  new TrackCoronaScatterplotLayer(
    'https://www.trackcorona.live/api/provinces',
    {name: 'Provinces', img: require('../assets/provinces.png')},
    'covid-provinces-scatterplot',
    {
        center: {lat: 46.2276, lng: 2.2137},
        zoom: 7
    }
)

const CitiesScatterplot =  new TrackCoronaScatterplotLayer(
    'https://www.trackcorona.live/api/cities',
    {name: 'Cities', img: require('../assets/cities.png')},
    'covid-cities-scatterplot',
    {
        center: {lat: 48.8566, lng: 2.3522},
        zoom: 9
    }
)

export const covidLayers = [
    CountriesScatterplot,
    ProvincesScatterplot,
    CitiesScatterplot
];