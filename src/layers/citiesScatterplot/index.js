import {ScatterplotLayer} from '@deck.gl/layers'

export class CitiesScatterplotLayer {
  constructor() {}
  static async *getLayers() {    
    const data = await fetch('https://www.trackcorona.live/api/cities').then(res => res.json()).then(data => data.data)

    const layers = [
      new ScatterplotLayer({
        id: 'covid-cities-scatterplot',
        data: data,
        opacity: 0.8,
        filled: true,
        radiusMinPixels: 2,
        radiusMaxPixels: 100,
        pickable: true,
        autoHighlight: true,
        getPosition: d => [d.longitude, d.latitude],
        getRadius: d => d.confirmed,
        getFillColor: [243, 119, 72],
        onHover: ({ object, x, y }) => {
            const tooltipEl = document.getElementById('tooltip')
            const locationEl = document.getElementById('location')
            const updatedEl = document.getElementById('updated')
            const confirmedEl = document.getElementById('confirmed')
            const recoveredEl = document.getElementById('recovered')
            const deadEl = document.getElementById('dead')
            if (object) {
                const {location, updated, confirmed, recovered, dead} = object
                locationEl.textContent = location
                updatedEl.textContent = updated
                confirmedEl.textContent = confirmed
                recoveredEl.textContent = recovered
                deadEl.textContent = dead
                tooltipEl.style.zIndex = 3
                tooltipEl.style.left = x + 10 + 'px'
                tooltipEl.style.top = y + 10 + 'px'
            } else {
              tooltipEl.style.zIndex = 0
            }
        }
      })
    ]

    return layers
  }
  static getMapOptions() {
    return {
      center: {lat: 48.8566, lng: 2.3522},
      zoom: 9
    }
  }
  static getMetadata() {
    return {
      name: 'Cities',
      thumbnail: require('../../assets/cities.png')
    }
  }
}
