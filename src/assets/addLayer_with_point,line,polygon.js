// точки, линии, зоны
//generator et a geoJSON - http://geojson.io/#map=10/55.7553/37.7600

import {line, points, polygon} from "@/assets/geoJSON"

//Добавление ПОЛИГОНА из bd при загрузке карты.
map.on('load', () => {  //exactly needed
  map.addSource('myPolygon', {    //for v-1
    'type': 'geojson',
    'data': polygon
  })
  
  map.addLayer({
    "id": "myPolygon",
    "type": "fill",
    //'source': 'myPolygon',   // v-1
    "source": {               //v-2
      "type": "geojson",
      "data": polygon
    },
    "layout": {},
    "paint": {
      "fill-color": "#73e522",
      "fill-opacity": 0.8
    }
  })
})


// NO_WORKING
this.flyToPoly(Object.values(polygon).flatMap(f => f.geometry.coordinates[0]))




// .....................................................
// .....................................................
map.on('load', function () {
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
  
})

// ....

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


// map.addLayer({
//   'id': id,
//   'type': 'line',
//   'source': {
//     'type': 'geojson',
//     'data': {
//       'type': 'FeatureCollection',
//       'features': featureCollection
//     }
//   },
//   'paint': {
//     'line-width': 3,
//     // Use a get expression (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-get)
//     // to set the line-color to a feature property value.
//     'line-color': ['get', 'color'] //color
//   }
// })


// map.addLayer({
//   'id': 'userPoly',
//   'type': 'fill',
//   'source': 'userPoly',
//   'layout': {},
//   'paint': {
//     'fill-color': '#409EFF',
//     'fill-opacity': 0.15
//   }
// })

//а еще есть map.getLayer({})

