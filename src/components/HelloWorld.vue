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
    let feature = points.features[0]
    

//Добавление полигона из bd при загрузки карты.
    map.on('load', () => {  //exactly needed
      map.addSource('myPolygon', {    //for v-1
        'type': 'geojson',
        'data': polygon
      })
    
      map.addLayer({
        "id": "myPolygon",
        "type": "fill",
        'source': 'myPolygon',   // v-1
        // "source": {               //v-2
        //   "type": "geojson",
        //   "data": polygon
        // },
        "layout": {},
        "paint": {
          "fill-color": "#73e522",
          "fill-opacity": 0.8
        }
      })
    })
  
  
  
  
  
  },
  methods: {
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
