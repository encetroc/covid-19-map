import { ScatterplotLayer } from '@deck.gl/layers'

export class TrackCoronaScatterplotLayer {
    data

    constructor(url, metaData, id, mapOptions) {
        this.url = url
        this.metaData = metaData
        this.id = id
        this.mapOptions = mapOptions
        this.getData()
    }

    async getData() {
        this.data = await fetch(this.url).then(res => res.json()).then(data => data.data)
    }

    async getLayers() {
        const layers = [
            new ScatterplotLayer({
                id: this.id,
                data: this.data,
                opacity: 0.8,
                filled: true,
                radiusMinPixels: 10,
                radiusMaxPixels: 40,
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
                        const { location, updated, confirmed, recovered, dead } = object
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

    getMapOptions() {
        return {
            center: this.mapOptions.center,
            zoom: this.mapOptions.zoom
        }
    }
    
    getMetadata() {
        return {
            name: this.metaData.name,
            thumbnail: this.metaData.img
        }
    }
}
