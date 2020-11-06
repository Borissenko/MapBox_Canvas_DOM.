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
      zoom: 12
    })
  
    let hoveredStateId = null
    
    map.on('load', () => {
      map.addSource('myPolygon', {
        'type': 'geojson',
        'data': polygons  // на том же уровне, что и properties, д.б. задано поле id (!).
      })
      map.addLayer({
        "id": "myPolygonId",
        "type": "fill",
        "source": 'myPolygon',
        "layout": {},
        "paint": {
          "fill-color": "#73e522",
          'fill-outline-color': 'rgba(200, 100, 240, 1)',
          'fill-opacity': [       //при hover изменяется opacity
            'case',
            ['boolean', ['feature-state', 'hover'], false],  //hover здесь - это поле у FeatureState, созданное в обработчике. 'feature-state' - обозначает FeatureState.
            1,   //при наведении
            0.5  //по-умолчанию
          ]
        }
      })
  
      map.on('mousemove', 'myPolygonId', function (e) {
        if (e.features.length > 0) {
          if (hoveredStateId) {
            map.setFeatureState(
              { source: 'myPolygon', id: hoveredStateId },
              { hover: false }
            );
          }
          hoveredStateId = e.features[0].id;
          map.setFeatureState(
            { source: 'myPolygon', id: hoveredStateId },
            { hover: true }
          )
        }
      })
      
      map.on('mouseleave', 'myPolygonId', function () {
        if (hoveredStateId) {
          map.setFeatureState(
            { source: 'myPolygon', id: hoveredStateId },
            { hover: false }
          )
        }
        hoveredStateId = null;
      })
  
    })
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
