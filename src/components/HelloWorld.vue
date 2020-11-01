<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'  //it is no work !
import 'mapbox-gl/dist/mapbox-gl.css'                    // it is necessary exactly!
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import mapboxPolyline from '@mapbox/polyline'

import {points, line, polygon} from '@/assets/geoJSON'

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g' //get it et https://account.mapbox.com/
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 12
    })
  
  
    map.on('style.load', () => {
      let features = points.features
      features.forEach(feature => {    //752
        let camElement = this.addCameraElementToDOM(feature)  //генерация html для маркера, с присуждением ему id-атрибута.
    
        document.getElementById(feature.properties.id)   //вешаем на html ОБРАБОТЧИК.
          .onclick = (e) => {
          console.log(e.target.id)   // (!)
          //ТАКЖЕ можно что-то делать, чисто отталкиваясь от feature.properties.id.
        }
        
        let cameraMarker = new mapboxgl.Marker(camElement)    //на основе созданного html-маркера генерируем на карте МАРКЕР-ЭКЗЕМПЛЯР.
        .setLngLat(feature.geometry.coordinates)
        .addTo(map)
    
        // setTimeout(() => {
        //     this.addClassToElement(document.getElementById(55), 'hide_selected_camera')
        // }, 0)
      })
    })
  
  
    
    
  },
  methods: {
    addCameraElementToDOM: function (feature) {
      let camElement = document.createElement('div')   // initialisation html-формы
    
      camElement.className = 'my_marker'  // add class
      // camElement.setAttribute('id', '55')  //add id=""
      camElement.setAttribute('tabindex', '-1')  //add attribute "tabindex".
    
      let htmlForMarker = ''
      // htmlForMarker +=`<div data-title="${feature.properties.id}"></div>`   //draw children with data-title=""
      htmlForMarker +=`<div id="${feature.properties.id}"></div>`   //draw children with data-title="",   // document.querySelector()
      camElement.innerHTML = htmlForMarker //set htmlForMarker
    
      return camElement
    },
// Универсальные метод для добалевния source для карты
    addSourceOnMap: function(sourceName, featureArray) {
      map.addSource(sourceName, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: featureArray
        },
        cluster: true,
        clusterMaxZoom: 20,
        clusterRadius: 50
      });
    },
    flyToPoly(coordinates) {
      return new Promise((resolve, reject) => {
        if (coordinates.length) {
          let bounds = coordinates.reduce((bounds, coord) => {
              return bounds.extend(coord)
            },
            new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
          )
          
          map.fitBounds(bounds, {
            padding: 80
          })
          resolve()
        }
      })
    }
  }
}
</script>

<style>
.my_marker {
  width: 10px;
  height: 20px;
  background: red;
}

.none {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}

#map {
  position: absolute;
  top: 10px;
  left: 10px;
  height: 90vh;
  width: 95%;
}
</style>
