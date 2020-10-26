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
    
    
    //КНОПКА и функция для генерации ПОЛИГОНА.
    //Эту кнопку можно добавлять помимо добавления кнопок масштаба with map.addControl(new mapboxgl.NavigationControl()
    let mapboxDraw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    })
    map.addControl(mapboxDraw, 'top-right')
    
    this.$nextTick(() => {  // добавляем дополнительные свойства у выше созданных кнопок.
      this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon").title = "Полигон"
      this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon").classList.add('none')
      
      document.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_trash").title = "Удалить полигон"
      this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_trash").classList.add('none')
      
      this.$el.querySelector(".mapbox-gl-draw_trash_all").classList.add('none')
    })
    
    map.addControl(new mapboxDrawDeleteAll(mapboxDraw, this), 'top-right');
    
    
    //КНОПКА "УДАЛИТЬ все полигоны"
    class mapboxDrawDeleteAll {
      constructor(_context, _component_context) {
        this._context = _context;
        this._component_context = _component_context;
      }
      
      onAdd(map) {
        this.map = map;
        this.container = document.createElement('div');
        this.container.className = 'mapbox-gl-draw_trash_all mapboxgl-ctrl';
        this.container.title = 'Удалить все территории';
        
        this._setupUI();
        return this.container;
      }
      
      onRemove() {
        this.container.parentNode.removeChild(this.container);
        this.map = undefined;
      }
      
      _setupUI() {
        this.container.addEventListener('click', () => this._deleteAllPoly())
      }
      
      _deleteAllPoly() {
        this._context.deleteAll();
        this._component_context.polygons = {};
      }
    }
    
    this.map.addControl(new mapboxDrawDeleteAll(this.MapboxDraw, this), 'top-right');
    
    
    // сохранение нарисованного полигона
    // this.map.on('style.load', () => {
      this.map.on('draw.create', function (e) {
        let polygons = []
        
        let id = e.features[0].id;
        polygons[id] = e.features[0]
        
        console.log('')
        
      })
    // })
    
    
    // ......................................................
    // Навигация по карте при помощи клавиатуры
    this.map.keyboard.enable()
    
    //Кнопка и функция для генерации ПОЛИГОНА.
    let mapboxDraw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      }
    })
    map.addControl(mapboxDraw, 'top-right')

    this.$nextTick(() => {  // добавляем свои свойства к стандартно созданным контролам на карте
      this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon").title = "Полигон"
      this.$el.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon").classList.add('none')
      // document.querySelector(".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_trash").title = "Удалить полигон"
    })
    
    
    
    
    // ......................................................
    //произвольный маркер
    let el = document.createElement('div')
    el.className = 'my_marker'
    
    const my_marker = new mapboxgl.Marker(el)  // если el не задавать, то по-умолчанию - каплевидный значек.
    .setLngLat([37.65, 55.75])
    .addTo(map)
    
    //удалить маркер
    // my_marker.remove()
    
    
    //клик по маркеру и его сохранение
    this.map.on('click', 'cameras', (e) => {
      let selectedCameraId = this.map.queryRenderedFeatures(e.point)[0].properties.id;
      // найдём объект с данной камерой и вернём его
      let index = -1;
      for (let i = 0; i < this.cameraList.length; i++) {
        if (this.cameraList[i].CAMERA == selectedCameraId) {
          index = i;
          break;
        }
      }
      this.$emit('clickedCamera', this.cameraList[index]);
    })
    
    
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
    // попапы ( пояснялка ).
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
