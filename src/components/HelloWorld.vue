<template>
  <div>
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import MapboxDraw from "@mapbox/mapbox-gl-draw"
import mapboxPolyline from '@mapbox/polyline'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'  //it is no work !
import 'mapbox-gl/dist/mapbox-gl.css'             // it is necessary exactly!

import {points, line, zone} from '@/assets/geoJSON'

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g'
    
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 12
    })
    
    
    //кнопочки навигации, вар 1, РАЗВЕРНУТЫЙ набор.
    // let Draw = new MapboxDraw()
    // map.addControl(Draw, 'top-right')
    
    //кнопочки навигации, вар 2.
    // map.addControl(new mapboxgl.NavigationControl(),'top-right')
    map.addControl(new mapboxgl.NavigationControl({  // или
      showCompass: true,
      showZoom: true
    }), 'top-right')
    
    //кнопочки навигации, вар 3.
    // const nav = new mapboxgl.NavigationControl();
    // map.addControl(nav, "top-right")
    
    
    //кнопка для перехода в точку, где ты сейчас находишься
    const geolocate = new mapboxgl.GeolocateControl({  //This locates the user on the map based on the browser's geolocation API.
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })
    map.addControl(geolocate, "top-right")
  
  
  
    //произвольный маркер
    const marker = new mapboxgl.Marker()
    .setLngLat([37.618423, 55.751244])
    .addTo(map)
    
    
    
    map.on('load', function () {
      console.log('= load =')
      
      map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": points
        },
        "layout": {
          "icon-image": "{icon}-15",
          "text-field": "{title}",
          "text-font": ["Arial"],
          "text-offset": [0, 0.7],
          "text-anchor": "top"
        }
      })
      
      map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": line
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-color": "#888",
          "line-width": 8
        }
      })
    })
    
    map.addLayer({
      "id": "main",
      "type": "fill",
      "source": {
        "type": "geojson",
        "data": zone
      },
      "layout": {
      },
      "paint": {
        "fill-color": "#888",
        "fill-opacity": 0.8
      }
    })
  }
}
</script>

<style>
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
