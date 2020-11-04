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
import Supercluster from 'supercluster';

import {points, lines, line, polygons} from '@/assets/geoJSON'

export default {
  mounted() {
    
    // mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZnNic20wMzlrMnFxa3didHFyYzFzIn0.RdgEdp7LaXIslsPrEGpwmA';
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g';  //my
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 9
    })
    
    map.on('load', function () {
      const index = new Supercluster({   //1
        radius: 40,
        maxZoom: 16,
        initial: function () {
          return {
            status0: 0,
            status1: 0,
            analiticsData: [],
            selectedCount: 0,
            territoryNames: '',
            groupNames: '',
            cameraNames: '',
          }
        },
        map: (props) => {  //returns cluster properties
         return {sum: props.myValue}
        },
        reduce: (accumulated, props) => { //merges properties of two clusters into one
          accumulated.sum += props.sum
        }
      })

//добавляем кластерные ресурсы
      map.addSource('camerasSuperCluster', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
          //features: index.getClusters([westLng, southLat, eastLng, northLat], zoom).features
        },
        buffer: 1,
      })
      
      index.load(points)   //2
      
      // map.addLayer({
      //   id: 'clusters',
      //   type: 'circle',
      //   source: 'earthquakes',
      //   paint: {}
      // })
      
    })
    
  },
  methods: {}
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
