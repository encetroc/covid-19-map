[![Netlify Status](https://api.netlify.com/api/v1/badges/9abd3891-7e41-4249-82d6-3e2c6ea8677d/deploy-status)](https://app.netlify.com/sites/suspicious-sammet-ca739d/deploys)  
![GitHub top language](https://img.shields.io/github/languages/top/encetroc/covid-19-map?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/encetroc/covid-19-map?style=for-the-badge)
![GitHub](https://img.shields.io/github/license/encetroc/covid-19-map?style=for-the-badge)
![Website](https://img.shields.io/website?style=for-the-badge&url=https%3A%2F%2Fsuspicious-sammet-ca739d.netlify.app%2F)
![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/encetroc/covid-19-map/dev/parcel-bundler/main?style=for-the-badge)
# Map of covid-19
<p align="center">
  <img src="./demo.gif">
</p>

This project is about making a real word app that every body can use, and so I chose to make a map where you can explore covid-19 cases around the world.  
It is made using only HTML, CSS and Javascript, I used Parcel to minify and bundle the project and Netlify to deploy it.  
The covid-19 map app contains the following features:
- A full-fledged Google maps
- A menu to show covid-19 cases by cities, provinces or countries
- A tooltip that shows the name of the place, last update and confirmed cases
## How to use
Clone the project to your machine:
```bash
git clone https://github.com/encetroc/covid-19-map.git
```
Get inside the project's folder:
```bash
cd covid-19-map
```
Install dependencies:
```bash
npm install
```
run the project:
```bash
npm run dev
```
All source files (html, css, js and assets) are in `src` directory.
## Roadmap
- [ ] Add some style to the tooltip
- [ ] Add loading screen when data is being downloaded
- [ ] Add a search bar, to search by countries, provinces or cities
- [ ] Add transition animation when you navigate from place to place
- [ ] Add the possibility to filter between confirmed, dead and recovered cases
- [ ] Add a heatmap display for cities cases
## Authors and acknowledgment
- A big thank to [Jeff Delaney](https://github.com/codediodeio) who inspired me to make this project after I watched his Youtube [video](https://www.youtube.com/watch?v=e_5W-JF_E2U&t)
- Thanks to [TrackCorona](https://www.trackcorona.live/api) for providing the data