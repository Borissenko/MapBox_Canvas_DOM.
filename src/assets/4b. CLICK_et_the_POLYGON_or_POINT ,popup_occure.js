//Появление попапа при клике по полигону
//https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/

//ОБРАБОТЧИКИ - https://docs.mapbox.com/mapbox-gl-js/api/events/#mapmouseevent#target

import mapboxgl from "mapbox-gl";
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
    
    map.on('load', () => {
      map.addSource('myPolygon', {
        'type': 'geojson',
        'data': polygons  // на том же уровне, что и properties, д.б. задано поле id (!!!).
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
            1,   //при наведении                             //это используется в примере "Изменение paint-настроек".
            0.5  //по-умолчанию
          ]
        }
      })


//...............
      // When a click event occurs on a feature in the states layer, open a popup at the
      // location of the click, with description HTML from its properties.
      
      map.on('click', 'myPolygonId', function (e) {    //myPolygonId - это 'id' et map.addLayer(), при добавлении ПОЛИГОНОВ или ТОЧЕК.
        
        // targetSTAFF
        e.features[0]   //доступ ко всем показалелям geoGSON'a КЛИКНУТОГО полигона. НЕПЕРЕЧИСЛЯЕМОЕ свойство(!).
        e.features[0].properties
        e.features[0].layer
        e.features[0]._geometry.coordinates
        e.features[0].source   // 'myPolygonId'
        e.lngLat.lng
        var featuresData = e.features[0].properties
  
      
        
        
        //получение координат кликнутого полигона/иконки и коррекция координат.
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

      
      
//...............
//hover-эфект для полигона.
//https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
// Изменение paint-настроек (здесь - fill-opacity полигона), описанных в map.addLayer({}), при наведении мышкой.
// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.

//см также Create interactive hover effects - https://docs.mapbox.com/help/tutorials/create-interactive-hover-effects-with-mapbox-gl-js/ (!)
      
      let hoveredStateId = null
  
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

// When the mouse leaves the state-fill layer, update the feature state of the
// previously hovered feature.
      map.on('mouseleave', 'myPolygonId', function () {
        if (hoveredStateId) {
          map.setFeatureState(
            { source: 'myPolygon', id: hoveredStateId },
            { hover: false }
          )
        }
        hoveredStateId = null;
      })

      
      
//...............
      //Создание курсора POINTER при наведении на элемент слоя.
      // Change the cursor to a pointer when the mouse is over the states layer.
      map.on('mouseenter', 'myPolygonId', function () {
        map.getCanvas().style.cursor = 'pointer'
      })

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'myPolygonId', function () {
        map.getCanvas().style.cursor = ''
      })

      
//...............
      //обработчик для СЕНСОРНЫХ этранов
      import hammer from 'hammerjs'
      hammer(el).on('tap', () => {
        //увеличиваем zoom при касании по дисплею
        const currentZoom = this.map.getZoom()
        this.map.flyTo({
          center: coords,
          zoom: this.observersSuperCluster.getClusterExpansionZoom(c1.properties.cluster_id) <= currentZoom ? 18 : this.camerasSuperCluster.getClusterExpansionZoom(c1.properties.cluster_id),
          bearing: 0,
          easing: function (t) {
            return t
          }
        })
      })
      
    })
  }
}



//...............
//ПОЛЕЗНОЕ

//Запрос данных ресурса
let coordinates = map.getSource(id)._data.features[0].geometry.coordinates
















