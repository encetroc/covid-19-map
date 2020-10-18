import { covidLayers } from './layers'
import { GoogleMapDeckGL } from './google-map-deckgl'

class App {
	constructor() {
		this.GoogleMapDeckGL = new GoogleMapDeckGL()
		this.init()
		this.selectedButton
	}

	async init() {
		const defaultId = 0
		const defaultLayers = covidLayers[defaultId]
		const map_options = defaultLayers.getMapOptions()
		await this.GoogleMapDeckGL.initMapWithOverlay(map_options)
		this.buildMenu(defaultId)
		this.changeLayers(defaultLayers)
	}

	buildMenu(defaultLayersId) {
		const menu = document.getElementById('menu')
		this.GoogleMapDeckGL.map.addListener('dragstart', () => {
			menu.classList.add('fade')
		})
		this.GoogleMapDeckGL.map.addListener('dragend', () => {
			menu.classList.remove('fade')
		})
		covidLayers.forEach((myLayers, index) => {
			const layersMetadata = myLayers.getMetadata()
			const button = document.createElement('button')
			const label = document.createElement('div')
			label.classList.add('label')
			label.innerText = layersMetadata.name
			button.style.backgroundImage = `url(${layersMetadata.thumbnail})`
			button.onclick = (() => {
				this.selectedButton.classList.remove('selected')
				this.selectedButton = button
				this.selectedButton.classList.add('selected')
				this.changeLayers(myLayers)
			}).bind(this, myLayers)
			button.appendChild(label)
			menu.appendChild(button)
			if (index === defaultLayersId) {
				this.selectedButton = button
				this.selectedButton.classList.add('selected')
			}
		})
	}

	async changeLayers(newLayers) {
		const layers = await newLayers.getLayers()
		const mapOptions = newLayers.getMapOptions()
		this.GoogleMapDeckGL.setLayer(layers)
		this.GoogleMapDeckGL.setMap(mapOptions)
	}
}

const app = new App()