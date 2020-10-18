import {covidLayers} from './layers'
import {GoogleMapDeckGL} from './google-map-deckgl'

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
    this.changeExample(defaultLayers)
  }

  buildMenu(defaultLayersId) {
    const menu = document.getElementById('menu')
    this.GoogleMapDeckGL.map.addListener('dragstart', () => {      
      menu.classList.add('fade')
    })    
    this.GoogleMapDeckGL.map.addListener('dragend', () => {
      menu.classList.remove('fade')
    })
    covidLayers.forEach((example, index) => {
      const exampleMetadata = example.getMetadata()
      const button = document.createElement('button')
      const label = document.createElement('div')
      label.classList.add('label')
      label.innerText = exampleMetadata.name
      button.style.backgroundImage = `url(${exampleMetadata.thumbnail})`
      button.onclick = (() => {                 
        this.selectedButton.classList.remove('selected')    
        this.selectedButton = button
        this.selectedButton.classList.add('selected')
        this.changeExample(example)
      }).bind(this, example)
      button.appendChild(label)
      menu.appendChild(button)
      if (index === defaultLayersId) {
        this.selectedButton = button
        this.selectedButton.classList.add('selected')
      }      
    })
  }

  changeExample(newLayers) {
    const layers = newLayers.getLayers()    
    const mapOptions = newLayers.getMapOptions()
    setTimeout(()=>{
      this.setLayer(layers)
      this.GoogleMapDeckGL.setMap(mapOptions)
    },100)
    
  }

  async setLayer(layers) {
    let next = await layers.next()
    if (next.value){
      this.GoogleMapDeckGL.setLayer(next.value)
    }
  }  
}

const app = new App()