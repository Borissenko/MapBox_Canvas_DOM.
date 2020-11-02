//Появление попапа при клике по полигону

import mapboxgl from "mapbox-gl";
import {polygons} from "@/assets/geoJSON";

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g' //get it et https://account.mapbox.com/
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 12
    })
    
    map.on('load', () => {
      map.addSource('myPolygon', {
        'type': 'geojson',
        'data': polygons
      })
      map.addLayer({
        "id": "myPolygonId",
        "type": "fill",
        "source": 'myPolygon',
        "layout": {},
        "paint": {
          "fill-color": "#73e522",
          'fill-outline-color': 'rgba(200, 100, 240, 1)',
          "fill-opacity": 0.8
        }
      })
      
      
      // When a click event occurs on a feature in the states layer, open a popup at the
      // location of the click, with description HTML from its properties.
      map.on('click', 'myPolygonId', function (e) {    //myPolygonId - это 'id' et map.addLayer(), при добавлении ПОЛИГОНА или ТОЧКИ.
        let targetStaff = e.features[0]   //доступ ко всем показалелям из geoGSON'a.
        
        //получение координат кликнутого полигона и коррекция их.
        let coordinates = e.features[0].geometry.coordinates.slice()  //применимо более для точки.

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        
        //генерация попапа при клике по полигону или точке.
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(e.features[0].properties.description)   //этот текст будет прописан в попапе.
        .addTo(map);
      })
      
      
      // Change the cursor to a pointer when the mouse is over the states layer.
      map.on('mouseenter', 'myPolygonId', function () {
        map.getCanvas().style.cursor = 'pointer'
      })
      
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'myPolygonId', function () {
        map.getCanvas().style.cursor = ''
      })
      
    })
  }
}