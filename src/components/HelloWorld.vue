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
    console.log('feature.properties.id ====', feature.properties.id)

//создаем внешний вид маркера, с помощью HTML и CSS.
    let el = document.createElement('div')
    el.className = 'my_marker'
    // el.setAttribute('id', 'gg')  //add id=""
    el.setAttribute('tabindex', '-1')  //add attribute "tabindex='-1".
    el.innerHTML = `<div id="${feature.properties.id}">GO</div>`

//на html вешаем обработчик.
//camElement.getElementsByClassName('gg')[0]   //срабатывает.
//camElement.getElementById('gg')              //НЕ срабатывает почему-то.
    el.querySelector("#gg").onclick = (e) => {
      console.log('gg')   // сразу можем что-то сделать, т.к. уже прицелены.
      const actionName = e.target.dataset.actionName  //дополнительно отбираем по [data-action-name="55"].
      if (feature.properties.id) {                    //дополнительно отбираем по feature.properties.id.
        console.log('doIt()')
      }
    }

//инициируем маркер
    const my_marker_1 = new mapboxgl.Marker(el)  // если el не задавать, то по-умолчанию - каплевидный значек.
    .setLngLat([37.65, 55.75])
    .addTo(map)
    
    
  },
  methods: {
// Универсальные метод для добалевния source для карты
    addSourceOnMap: function (sourceName, featureArray) {
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
