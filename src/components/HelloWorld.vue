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

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g'
  
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 12
    })
  
    // let Draw = new MapboxDraw();
    //
    // // map.addControl(Draw, 'top-left')
    // map.addControl(new mapboxgl.NavigationControl(),'top-right')
  
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, "top-right")
    
    const marker = new mapboxgl.Marker()
      .setLngLat([37.618423, 55.751244])
      .addTo(map)
  
    const geolocate = new mapboxgl.GeolocateControl({  //This locates the user on the map based on the browser's geolocation API.
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })
    map.addControl(geolocate, "top-right")
    
    map.on('load', function() {
      console.log('= load =')
    });
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
