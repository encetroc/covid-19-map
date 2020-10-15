import {covidLayers} from './layers';
import {GoogleMapDeckGL} from './google-map-deckgl';

// Builds the demo UI
class App {
  constructor() {
    this.GoogleMapDeckGL = new GoogleMapDeckGL();
    this.animation_frames = [];
    this.init();
    this.selected_button;
  }

  async init() {  
    const defautl_id = 0
    const default_example = covidLayers[defautl_id];
    const map_options = default_example.getMapOptions();
    await this.GoogleMapDeckGL.initMapWithOverlay(map_options);    
    this.buildMenu(defautl_id);
    this.changeExample(default_example);  
  }

  buildMenu(default_example_id) {
    const menu = document.getElementById('menu');  
    // remove the menu when the map is being dragged
    this.GoogleMapDeckGL.map.addListener('dragstart', () => {      
      menu.classList.add('fade');
    });    
    this.GoogleMapDeckGL.map.addListener('dragend', () => {
      menu.classList.remove('fade');
    });
    // add the available layers to the menu
    covidLayers.forEach((example, index) => {
      const example_metadata = example.getMetadata();
      const button = document.createElement('button');
      const label = document.createElement('div');
      label.classList.add('label');
      label.innerText = example_metadata.name;
      button.style.backgroundImage = `url(${example_metadata.thumbnail})`;
      // style the selected layer in menu
      button.onclick = (() => {                 
        this.selected_button.classList.remove('selected');    
        this.selected_button = button;
        this.selected_button.classList.add('selected');
        this.changeExample(example);
      }).bind(this, example);
      button.appendChild(label);
      menu.appendChild(button);
      if (index === default_example_id) {
        this.selected_button = button;
        this.selected_button.classList.add('selected');
      }      
    });
  }

  changeExample(example) {
    const layers = example.getLayers();    
    const map_options = example.getMapOptions();    
    // short timeout so map load doesn't jank menu css transitions
    setTimeout(()=>{
      this.setLayer(layers);  
      this.GoogleMapDeckGL.setMap(map_options);
    },100)
    
  }

  
  // Changes the Deck.gl layer applied to GoogleMapsOverlay
  async setLayer(layers) {    
    // Interrupt currently animated layer
    this.animation_frames.forEach(frame_id => cancelAnimationFrame(frame_id));
    let next = await layers.next();
    if (next.value){
      this.GoogleMapDeckGL.setLayer(next.value)
      if (!next.done){
        const id = requestAnimationFrame((() => {
            this.setLayer(layers)
          }).bind(this, layers));
        this.animation_frames.push(id)
      }
    }
  }  
}

const app = new App();