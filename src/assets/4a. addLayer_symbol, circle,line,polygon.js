// точки, линии, зоны
// https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-symbol-icon-color

//generator geoJSON - http://geojson.io/#map=10/55.7553/37.7600

//пример добавления точки - https://docs.mapbox.com/mapbox-gl-js/example/geojson-markers/

import {line, lines, points, polygons} from "@/assets/geoJSON"
import mapboxgl from "mapbox-gl";

export default {
  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmljazAxNiIsImEiOiJja2doZno4am0wM2M5MnlxazM0Nmw2ZDhnIn0.0i8-KDxG6rT0r-p3NomT0g' //get it et https://account.mapbox.com/
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [37.618423, 55.751244],
      zoom: 12
    })
    
    map.on('load', () => {  //exactly needed (!!!!)
  
      //описание полей см. https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-fill-fill-sort-key
 
      // == ПОЛИГОН
      //https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
      map.addSource('myPolygon', {    //for v-1
        'type': 'geojson',
        'data': polygons
      })
      
      map.addLayer({
        "id": "myPolygonId",
        "type": "fill",  //background, fill (polygon), line, symbol, raster(как спутниковый снимок), circle, fill-extrusion (3D-polygon), heatmap (тепловая карта).
        "source": 'myPolygon',       //v-1
        // "source": {               //v-2
        //   "type": "geojson",
        //   'data': {
        //     'type': 'FeatureCollection',
        //     'features': polygons
        //   }
        // },
        // "source": {               //v-3
        //   "type": "geojson",
        //   "data": polygons // or   'url': 'mapbox://examples.dl46ljcs'
        // },
        "filter": [],  //Only features that match the filter are displayed.
        "layout": {},
        "paint": {
          "fill-color": "#73e522",
          'fill-outline-color': 'rgba(200, 100, 240, 1)',  //border et a polygon
          "fill-opacity": 0.8,
          "visibility": "visible",  // "none"
          "fill-sort-key": 5,       //Типо z-index. Features with a higher sort key will appear above features with a lower sort key.
          "fill-translate-anchor": "map"  //"viewport". Относительно чего будет работать "fill-translate".
        }
      }, 'hospitals')   // Слой 'hospitals' будет ВЫШЕ слоя myPolygonId(!).  Этот аргумент можно не указывать.
      
    
      
      
      // == ЛИНИЯ
      //см. https://docs.mapbox.com/mapbox-gl-js/example/geojson-line/
      map.addSource('lines', {
        'type': 'geojson',
        'data': lines    //с line ТОЖЕ будет работать(!)
      })
      
      map.addLayer({
        "id": "lineId",
        "type": "line",
        "source": "lines",
        "layout": {
          "line-join": "round",   //"bevel"(скос), "round", "miter"(копье). Закругление линии в месте стыковки отрезков, для плавности.
          "line-miter-limit": 2,  //convert miter joins to bevel joins for sharp angles.
          "line-cap": "round"     //"butt", "round", "square". Закругление линии на ее окончаниях.
        },
        "paint": {
          //"line-color": "#888",
          "line-color": ['get', 'color'], // для каждой линии будет СВОЙ ЦВЕТ, взятый из поля properties.color
          "line-width": 8,
          "line-blur": 0,  //размытие, число более 1.
          "line-opacity": 1,
          "line-sort-key": 7,
          "visibility": "visible"  // "none"
        }
      })
  
  
      // == КРУЖОК
      map.addSource('circle', {
        type: 'vector',
        url: 'mapbox://mapbox.2opop9hr'
      })
      map.addLayer({
        'id': 'circleId',
        'type': 'circle',
        'source': 'museums',
        'layout': {
          'visibility': 'visible'  // make layer visible by default - ДЛЯ ВКЛЮЧЕНИЯ/ВЫКЛЮЧЕНИЯ слоя.
        },
        'paint': {
          'circle-color': 'rgba(55,148,179,1)',
          "circle-opacity": 1,
          'circle-stroke-color': 'red',  //обводка
          'circle-stroke-opacity': 1,
          'circle-stroke-width': 1,   //Units in pixels
  
          //'circle-radius': 8,
          "circle-radius": [    //изменение радиуса кружка в зависимости от zoom. https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/#types
            "interpolate", ["linear"], ["zoom"],
            // zoom is 5 (or less) -> circle radius will be 1px
            5, 1,
            // zoom is 10 (or greater) -> circle radius will be 5px
            10, 5
          ]
        }
      }, 'hospitals')   // Слой circleId будет НИЖЕ слоя 'hospitals'(!).
      
      
      
      
      // == 'symbol' (ИКОНКА) с ПОДПИСЬЮ под ней.
      //= https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#symbol
      //для использования СВОЕЙ img.png вместо иконки - см. пример https://docs.mapbox.com/mapbox-gl-js/example/geojson-markers/.
      //Доступные виды иконок - https://github.com/mapbox/mapbox-gl-styles
      
      //ЛОСТУПНЫЕ виды иконок (Нр, по старой версии mapBox) - document.asd.map.listImages() в консоле набрать.
      
      map.addSource('places', {
        'type': 'geojson',
        'data': points
      })
      
      map.addLayer({
        'id': 'places',
        'type': 'symbol',
        'source': 'places',
        'layout': {
          'icon-image': '{icon}-15',    //'music' - NO WORKING(!). We need "music-15". 'circle-15', 'circle-stroked-15'
          'icon-color': 'red',          //This can only be used with sdf-icons.
          'icon-size': 1.5,
          "icon-opacity": 1,
          "icon-halo-blur": 0,
          'icon-allow-overlap': true,    //разрешить перекрывать значек
          'icon-rotate': ['get', 'bearing'],   //для каждого отдельного point значение 'icon-rotate' будет браться из properties.bearing
          'icon-rotation-alignment': 'map',
          'icon-ignore-placement': true,   //If true, other symbols can be visible even if they collide with the icon.
          "icon-offset": [0, 0],      //смещение относительно anchor, [вправо от правой стороны ИКОНКИ, down от дна иконки], т.е. С УЧЕТОМ угла поворота иконки.
          'icon-translate': [0, 0],    //смещение anchor'a from its original placement.
          
          "text-field": "{title}",   // ПОДПИСЬ под иконкой, для каждого отдельного point значение "text-field" будет браться из properties.title
          // "text-field": ['get', 'title'],   //аналогично
          "text-font": ['Open Sans Regular'], // ['DIN Offc Pro Medium', 'Arial Unicode MS Bold',  'Arial Unicode MS Regular', 'DIN Offc Pro Italic'],
          'text-size': 5,
          "icon-text-fit": "none",    //"none", "width", "height", "both" - Масштабирует значок по размеру связанного текста.
          
          "text-anchor": "top",       //какой своей точкой текст совпадает с локацией. "center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"
          "text-offset": [0, 0.7],    //ВЫНОС текста относительно anchor.
          'text-translate': [0, 0],    //вынос anchor'a from its original placement.
          'text-rotate': 0,           //Units in degrees.
          'text-transform': "none",   //"none", "uppercase", "lowercase"
          
  
          'text-justify': "center", // "auto", "left", "center", "right"
          'text-letter-spacing': 2,
          'text-line-height': 16,
          'text-max-width': 10,     //Units in ems
          
          'visibility': "visible"   //"none"
        },
        paint: {
          "text-color": "#23e8cf",   //цвет у "text-field".  Not put it in the layout{}!
          'text-opacity': 1,
          "text-halo-color": 'red',
          'text-halo-width': 2,
          // "font-weight"- здесь и нигде - нет!
        }
      })
  
  
      // В роли 'symbol' выступает ФОТОРГРАФИЯ.
      //https://docs.mapbox.com/mapbox-gl-js/example/add-image/
      //https://docs.mapbox.com/mapbox-gl-js/example/geojson-markers/
      map.on('load', function () {
        map.loadImage(
          'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
          function (error, image) {
            if (error) throw error;
            map.addImage('cat', image)      //создаем ресурс, если в роли иконки будет картинка
            
            map.addSource('point', {
              'type': 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': [
                  {
                    'type': 'Feature',
                    'geometry': {
                      'type': 'Point',
                      'coordinates': [0, 0]
                    }
                  },
                ]
              }
            })
            map.addLayer({
              'id': 'points',
              'type': 'symbol',
              'source': 'point',
              'layout': {
                'icon-image': 'cat',   //используем ранее заресурсивную картинку в роли иконки
                'icon-size': 0.25
              }
            });
          }
        );
      })
      
      
      
      // .................
      // Добавление картинки в ресурс
      import iconCar from './iconCar.'
      
      if (!this.map.hasImage('iconCar')) {
        let imgCar = new Image(20, 24);
        imgCar.onload = () => this.map.addImage('iconCar', imgCar)
        imgCar.src = iconCar
      }
  
  
  
      // .................
      //В роли 'symbol' - svg-IMG. V-2.
      import routeCircle from '../assets/svg/route-circle.svg'
      
      if (!this.map.hasImage('routeCircle')) {   //загрузка img в ресурс карты.
        let img = new Image(30, 30)    //создали пустую болванку для img.
        img.onload = () => this.map.addImage('routeCircle', img)
        img.src = routeCircle;
      }
  
      this.map.addLayer({
        'id': 'layerId',
        'type': 'symbol',
        'source': 'places',
        'layout': {
          'icon-image': 'routeCircle',
          'icon-size': 1,
          
          'text-field': ['get', 'text'],
          'text-font': ['Open Sans Regular'],
          'text-size': 13,
        },
        'paint': {
          'text-color': '#080808',
        }
      });
      
      
      
      
      
      
    })
  },
}



//ФИЛЬТРАЦИЯ ВЫВЕДЕНИЯ ИКОНОК, основываясь на подписи, а значение фильтра получаем из <input type="text">.
// https://docs.mapbox.com/mapbox-gl-js/example/filter-markers-by-input/




// = УПРАВЛЕНИЕ СЛОЕМ =.

// ОБНОВЛЕНИЕ ресурсов при их изменении
map.getSource(sourceName)
  .setData({
    'type': 'FeatureCollection',
    'features': features
  })

//или
var geojson = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'geometry': {
        'type': 'LineString',
        'coordinates': [[0, 0]]
      }
    }
  ]
}
map.addSource('line', {
  'type': 'geojson',
  'data': geojson
})
geojson.features[0].geometry.coordinates.push([x, y])
map.getSource('line').setData(geojson)





//УДАЛЕНИЕ полигона и его ресурса
function removeSelectedPolygons(sourceName) {
  if (map.getLayer(sourceName))
    map.removeLayer(sourceName)
  if (map.getSource(sourceName))
    map.removeSource(sourceName)
}





//ВКЛЮЧЕНИЕ-ВЫКЛЮЧЕНИЕ слоя кнопкой
//https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/

// см. turnLayerOff() и addLayer "circle".
methods: {
  turnLayerOff(map, clickedLayerId) {
    // map = map
    // clickedLayerId = 'circleId'
    e.preventDefault()
    e.stopPropagation()
    let visibility = map.getLayoutProperty(clickedLayerId, 'visibility')
    
    // toggle layer visibility by changing the layout object's visibility property
    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none')
    } else {
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    }
  }
}






//Находится ли ТОЧКА В ПРЕДЕЛАХ полигона.
//Пакет Turf позволяет узнать о том, находится ли точка в пределах полигона
//@turf/boolean-point-in-polygon
//https://github.com/Turfjs/turf
//https://www.npmjs.com/package/@turf/boolean-point-in-polygon
//(источник информации - https://habr.com/ru/company/ruvds/blog/489828/)

const pointInPolygon = require('@turf/boolean-point-in-polygon').default
const colorado = {
  "type": "Polygon",
  "coordinates": [[[-109, 41], [-102, 41], [-102, 37], [-109, 37], [-109, 41]]]
}

const denver = {
  "type": "Point",
  "coordinates": [-104.9951943, 39.7645187]
}
const sanFrancisco = {
  "type": "Point",
  "coordinates": [-122.4726194, 37.7577627]
}

pointInPolygon(denver, colorado)  // true
pointInPolygon(sanFrancisco, colorado)  // false






//КЛИК на КОНКРЕТНЫЙ полигон.
//https://docs.mapbox.com/mapbox-gl-js/example/polygon-popup-on-click/
map.on('click', 'myPolygonId', function (e) {    //e - дает индивидуальность ответа на клик по одному из полигонов полигон-слоя.
  new mapboxgl.Popup()
  .setLngLat(e.lngLat)
  .setHTML(e.features[0].properties.name)
  .addTo(map);
})
// Change the cursor to a pointer when the mouse is over the states layer.
map.on('mouseenter', 'states-layer', function () {
  map.getCanvas().style.cursor = 'pointer';
})
// Change it back to a pointer when it leaves.
map.on('mouseleave', 'states-layer', function () {
  map.getCanvas().style.cursor = '';
})







//БОКОВОЙ СПИСОК МАРКЕРОВ
//https://docs.mapbox.com/help/tutorials/building-a-store-locator/#add-event-listeners







// =МЕТОДЫ СЛОЯ =

map.getStyle().layers  //получение списка существующих слоев. В том числе БАЗИСНОЙ КАРТЫ(!),
//И далее ими МОЖНО УПРАВЛЯТЬ(!)

var firstSymbolId   //найти следи всех слоев тот, который имеет 'symbol'-отоюражение.
for (var i = 0; i < layers.length; i++) {
  if (layers[i].type === 'symbol') {
    firstSymbolId = layers[i].id;
    break;
  }
}
map.setPaintProperty(layerId, 'fill-color', color)      //изменение значения Paint-параметра у слоя
map.setPaintProperty(firstSymbolId, 'fill-color', color)




map.getLayer({})  //проверка наличия слоя
map.getLayoutProperty(clickedLayerId, 'visibility')         //запрос значения Layout-параметра слоя
map.setLayoutProperty(clickedLayer, 'visibility', 'none')   //изменение значения Layout-параметра у слоя

map.setPaintProperty(layer.value, 'fill-color', color)      //изменение значения Paint-параметра у слоя



