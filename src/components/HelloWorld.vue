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
    
    map.on('load', () => {
      map.addSource('myPoints', {    //for v-1
        'type': 'geojson',
        'data': points
      })
  
      let feature = points.features[0]
  
      let my_popup = new mapboxgl.Popup({ offset: 25 })
      .setText('Go!')
      
      const my_marker_1 = new mapboxgl.Marker({
        draggable: true
      })  // если el не задавать, то по-умолчанию - каплевидный значек.
      .setPopup(my_popup)              // attach popup to marker
      .setLngLat([37.65, 55.75])
      .addTo(map)
      
      // map.addLayer({
      //   'id': '_points_77',
      //   'type': 'symbol',
      //   "source": "myPoints",
      //   'layout': {
      //     'icon-image': 'music-15',    //"'icon-image': 'music'" - NO WORKING(!). We need 'music-15'.
      //     'icon-allow-overlap': true,    //разрешить перекрывать значек
      //     'icon-size': 1.5,
      //
      //     "text-field": "5",   // ПОДПИСЬ под иконкой, для каждого отдельного point значение "text-field" будет браться из properties.title
      //     "text-font": ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      //     "text-offset": [0, -0.5],   //ВЫНОС текста относительно center-bottom иконки.
      //     'text-size': 45,
      //     "text-anchor": "top", // где показывать попап
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
