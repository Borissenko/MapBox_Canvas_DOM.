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
  data: () => ({
    dd: 5,
    ww: null
  }),
  mounted() {
    
    
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g'  //my
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 12
    })
  
    function drawCanvasIcons(map) {
      let sw = 28;
      let sh = 28;
      let fillColor = "rgb(60,224,167)";
  
      let el = document.createElement('canvas');
      let ctx = el.getContext('2d');
  
      //goIcon
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = fillColor;
      ctx.moveTo(6, 14);
      ctx.lineTo(14, 6);
      ctx.lineTo(22, 14);

      ctx.moveTo(14, 6);
      ctx.lineTo(14, 22);
      ctx.stroke();

      let goIcon = ctx.getImageData(0, 0, sw, sh);
      map.addImage('goIcon', goIcon);
      ctx.clearRect(0, 0, sw, sh);
  
      
      
      // goToIcon
      ctx.beginPath();
      ctx.arc(14,5,3,0,Math.PI*2,true);
      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.strokeStyle = fillColor;
      ctx.moveTo(6, 19);
      ctx.lineTo(14, 11);
      ctx.lineTo(22, 19);
  
      ctx.moveTo(14, 11);
      ctx.lineTo(14, 25);
      ctx.stroke();
  
      let goToIcon = ctx.getImageData(0, 0, sw, sh);
      map.addImage('goToIcon', goToIcon);
      ctx.clearRect(0, 0, sw, sh);

      // goFromIcon
      ctx.beginPath();
      ctx.arc(14,23,3,0,Math.PI*2,true);
      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.beginPath();
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.strokeStyle = fillColor;
      ctx.moveTo(6, 11);
      ctx.lineTo(14, 4);
      ctx.lineTo(22, 11);

      ctx.moveTo(14, 4);
      ctx.lineTo(14, 17);
      ctx.stroke();
      
      let goFromIcon = ctx.getImageData(0, 0, sw, sh);
      map.addImage('goFromIcon', goFromIcon);
      ctx.clearRect(0, 0, sw, sh);
    }
    
    drawCanvasIcons(map)
    
    map.on('load', () => {
      map.addSource('places', {
        'type': 'geojson',
        'data': points
      })
      
      map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
          'icon-image': 'goToIcon',    //'music' - NO WORKING(!). We need "music-15". 'circle-15', 'circle-stroked-15'
        },
        paint: {}
      })
      
      
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
