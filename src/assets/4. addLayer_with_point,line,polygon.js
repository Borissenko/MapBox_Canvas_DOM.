// точки, линии, зоны
// Добавление из bd при загрузке карты.
//generator et a geoJSON - http://geojson.io/#map=10/55.7553/37.7600

import {line, lines, points, polygons} from "@/assets/geoJSON"

map.on('load', () => {  //exactly needed
  
  //ПОЛИГОН
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
  
  //ЛИНИЯ
  map.addSource('lines', {
    'type': 'geojson',
    'data': lines    //с line ТОЖЕ будет работать(!)
  })
  
  map.addLayer({
    "id": "lineId",
    "type": "line",
    "source": "lines",
    "layout": {
      "line-join": "round",
      "line-cap": "round"
    },
    "paint": {
      //"line-color": "#888",
      "line-color": ['get', 'color'], // для каждой линии будет СВОЙ ЦВЕТ, взятый из поля properties.color
      "line-width": 8
    }
  })
})

//ТОЧКА почему-то не получается...  ))
// .....................................................
// .....................................................

//один из примеров из туториала - point like img: https://docs.mapbox.com/help/troubleshooting/using-recolorable-images-in-mapbox-maps/

map.on('load', function () {
  map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": points
    },
    "layout": {
      "icon-image": "star",   //"{icon}-15"   && properties.icon = "star"
      // "text-field": "{title}",
      "text-font": ["Arial"],
      "text-offset": [0, 0.7],
      "text-anchor": "top"
    }
  })
  
})

map.addLayer({
  'id': '_point',
  'source': '_point',
  'type': 'symbol',
  'layout': {
    'icon-image': 'carIcon',
    'icon-size': 1.5,
    'icon-rotate': ['get', 'bearing'],
    'icon-rotation-alignment': 'map',
    'icon-allow-overlap': true,
    'icon-ignore-placement': true
  }
})


//а еще есть
map.getLayer({})

