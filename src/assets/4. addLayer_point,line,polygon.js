// точки, линии, зоны
// Добавление из bd при загрузке карты.
//generator et a geoJSON - http://geojson.io/#map=10/55.7553/37.7600

//пример добавления точки - https://docs.mapbox.com/mapbox-gl-js/example/geojson-markers/

import {line, lines, points, polygons} from "@/assets/geoJSON"

map.on('load', () => {  //exactly needed (!!!!)
  
  // == ПОЛИГОН
  //https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
  map.addSource('myPolygon', {    //for v-1
    'type': 'geojson',
    'data': polygons
  })
  
  map.addLayer({
    "id": "myPolygonId",
    "type": "fill",
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
    "layout": {},
    "paint": {
      "fill-color": "#73e522",
      'fill-outline-color': 'rgba(200, 100, 240, 1)',
      "fill-opacity": 0.8
    }
  })
  
  
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
      "line-join": "round",   //закругление линии в месте стыковки отрезков, для плавности.
      "line-cap": "round"     //закругление линии на ее окончаниях.
    },
    "paint": {
      //"line-color": "#888",
      "line-color": ['get', 'color'], // для каждой линии будет СВОЙ ЦВЕТ, взятый из поля properties.color
      "line-width": 8
    }
  })
  
  
  // == ИКОНКА
  //для использования СВОЕЙ img.png - см. пример https://docs.mapbox.com/mapbox-gl-js/example/geojson-markers/.
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
      'icon-size': 1.5,
      'icon-rotate': ['get', 'bearing'],   //для каждого отдельного point значение 'icon-rotate' будет браться из properties.bearing
      'icon-rotation-alignment': 'map',
      'icon-ignore-placement': true,
      
      "text-field": "{title}",   // ПОДПИСЬ под иконкой, для каждого отдельного point значение "text-field" будет браться из properties.title
      "text-font": ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      "text-offset": [0, 0.7],
      "text-anchor": "top" // где показывать попап
    }
  })
  
  
})


// ОБНОВЛЕНИЕ ресурсов при их изменении
map.getSource(sourceName).setData({
  'type': 'FeatureCollection',
  'features': features
})


//УДАЛЕНИЕ полигона и его ресурса
function removeSelectedPolygons(sourceName) {
  if (map.getLayer(sourceName))
    map.removeLayer(sourceName)
  if (map.getSource(sourceName))
    map.removeSource(sourceName)
}




//включение-ВЫКЛЮЧЕНИЕ слоя кнопкой
//https://docs.mapbox.com/mapbox-gl-js/example/toggle-layers/



//Находится ли ТОЧКА В ПРЕДЕЛАХ полигона.
//Пакет Turf позволяет узнать о том, находится ли точка в пределах полигона
//@turf/boolean-point-in-polygon
//https://github.com/Turfjs/turf
//https://www.npmjs.com/package/@turf/boolean-point-in-polygon
//(источник информации - https://habr.com/ru/company/ruvds/blog/489828/)

const pointInPolygon = require('@turf/boolean-point-in-polygon').default;

const colorado = {
  "type": "Polygon",
  "coordinates": [[
    [-109, 41],
    [-102, 41],
    [-102, 37],
    [-109, 37],
    [-109, 41]
  ]]
};

const denver = {
  "type": "Point",
  "coordinates": [-104.9951943, 39.7645187]
};

const sanFrancisco = {
  "type": "Point",
  "coordinates": [-122.4726194, 37.7577627]
};

// true
console.log(pointInPolygon(denver, colorado));

// false
console.log(pointInPolygon(sanFrancisco, colorado));


//ДОПОЛНИТЕЛЬНО
map.getLayer({})  //проверка наличия слоя
