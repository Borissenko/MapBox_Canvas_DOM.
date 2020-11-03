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

import {points, lines, line, polygons} from '@/assets/geoJSON'

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g' //get it et https://account.mapbox.com/
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 12
    })
  
    var sw = new mapboxgl.LngLat(-73.9876, 40.7661);
    var ne = new mapboxgl.LngLat(-73.9397, 40.8002);
    var llb = new mapboxgl.LngLatBounds(sw, ne);
    console.log('llb ===', llb)
  
    map.on('load', function () {
      map.addSource('places', {
        'type': 'geojson',
        'data': points
      })
  
      map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
          'icon-image': '{icon}-15',    //"'icon-image': 'music'" - NO WORKING(!). We need "'music-15".
          'icon-allow-overlap': true,    //разрешить перекрывать значек
          'icon-size': 3,
          'icon-rotate': ['get', 'bearing'],   //для каждого отдельного point значение 'icon-rotate' будет браться из properties.bearing
          'icon-rotation-alignment': 'map',
          'icon-ignore-placement': true,
  
          "text-field": "{title}",   //для каждого отдельного point значение "text-field" будет браться из properties.title
          //"text-font": ["Arial"],
          "text-offset": [0, 0.7],
          "text-anchor": "top"
        }
      })
  
      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on('click', 'places', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;
    
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
    
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
      });
  
      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on('mouseenter', 'places', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
  
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'places', function () {
        map.getCanvas().style.cursor = '';
      });
  
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
