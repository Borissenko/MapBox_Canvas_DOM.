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
import 'mapbox-gl/dist/mapbox-gl.css'                    // it is necessary exactly!

import {points, line, zone} from '@/assets/geoJSON'

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g' //get it et https://account.mapbox.com/
    
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 12
    })
   
  
  
    //......................................................
    //кнопки навигации
    
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
    
    
    
    
    // ......................................................
    //произвольный маркер
    let el = document.createElement('div')
    el.className = 'my_marker'
    
    const my_marker = new mapboxgl.Marker(el)  // если el не задавать, то по-умолчанию - каплевидный значек.
    .setLngLat([37.65, 55.75])
    .addTo(map)
    
    //удалить маркер
    // my_marker.remove()
    
    
    
    // .....................................................
    // точки, линии, зоны
  
    //generator et a geoJSON - http://geojson.io/#map=10/55.7553/37.7600
    
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
          "icon-image": "star",   //{icon}-15
          // "text-field": "{title}",
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
      
      map.addLayer({
        "id": "main",
        "type": "fill",
        "source": {
          "type": "geojson",
          "data": zone
        },
        "layout": {},
        "paint": {
          "fill-color": "#888",
          "fill-opacity": 0.8
        }
      })
    })
    
    
    
    //......................................................
    // попапы - пояснялка
    let popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: true  // закрыать при клике аутсайд
    })
    .setLngLat([37.618425, 55.751247])
    .setHTML(`
                <div>
                  <div>GO!</div>
                  <button data-action-name="add">add</button>
                  <button data-action-name="delete">delete</button>
                </div>
              `)
    .addTo(map)
  
  
    
    
    //......................................................
    //обработчик события в попапе
    let popUpNode = popup.getElement()
    this.setNewPassPopUpEventHandler(popUpNode)
    
  },
  methods: {
    setNewPassPopUpEventHandler(node) {
      node.onmouseover = () => {
        console.log('onmouseover ====')
      }
      
      node.onclick = (e) => {
        const actionName = e.target.dataset.actionName     //it is from <button data-action-name="delete">
        if (actionName)
          console.log('actionName ====', actionName)
        
        actionName && console.log('actionName ====', actionName) //the same
      }
    }
  
  
    //......................................................
    //
    
    
    
  }
}
</script>

<style>
.my_marker {
  width: 10px;
  height: 20px;
  background: red;
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
