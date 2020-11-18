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
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g';  //my
    
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 12
    })
    
    map.on('load', () => {
  
      let popup = new mapboxgl.Popup({
        closeButton: true,   //кестик на попапе для его удаления
        closeOnClick: true,  // закрыть попап при клике аутсайд
        offset: 25
      })
      .setLngLat([37.618425, 55.751247])
      .setHTML(`
                <div id="popup1">
                  <div>GO!</div>
                  <button data-action-name="add">add</button>
                  <button data-action-name="delete">delete</button>
                </div>
         `)
      //.setText('Go!') - вместо .setHTML() можно использовать. Более простой вариант.
      .addTo(map)
      
      const my_marker_1 = new mapboxgl.Marker()  // если el не задавать, то по-умолчанию - каплевидный значек.
      .setLngLat([37.65, 55.75])
      .addTo(map)
  
      map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point)
        console.log('e.point ====', e.point)
        console.log('features ====', features)
      })
      
      // map.addSource('myPoints', {
      //   'type': 'geojson',
      //   'data': points
      // })
      // let feature = points.features[0]
      // map.addLayer({
      //   'id': 'pointsId',
      //   'type': 'symbol',
      //   "source": "myPoints",
      //   'layout': {
      //     'icon-image': 'music-11',
      //     "text-field": '{title}',
      //     // "text-field": ['get', 'title'],
      //     "text-font": ['Open Sans Regular']
      //   },
      //   paint: {
      //     "text-color": "#48f6cd"
      //   }
      // })
      
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
