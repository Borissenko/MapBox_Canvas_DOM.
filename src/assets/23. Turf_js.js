//Welcome to Turf.js

//https://docs.mapbox.com/help/tutorials/analysis-with-turf/
//http://turfjs.org/
//http://turfjs.org/docs/#distance    <<==== перечень функций.

//Растояние между 2 точками в метрах.                                        //http://turfjs.org/docs/#distance
function getDistanceBetweenPoints([startCoords, endCoords]) {
  let from = turf.point(startCoords)
  let to = turf.point(endCoords)
  return turf.distance(from, to, {units: 'kilometers'});
}


//Азимут между 2 точками
let startPoint = turf.point([2, 5])  //Трансформация пары координат в фичу ТОЧКА.
let endPoint = turf.point([7, 3])
angle = turf.bearing(startPoint, endPoint)



// Конвертация массива координат в отдельную фичу ЛИНИИ.
let line = turf.lineString([[80, 22], [33, 11]],  {name: 'line 1', distance: 145})     //npm install turf-linestring
line = {
  geometry: {type: "LineString", coordinates: [[80, 22], [33, 11]]},
  properties:  {
    name: 'line 1',
    distance: 145
  }
}


let tracklet = turf.along(line, 5, {units: 'kilometers'})
  
  
  
  
  
  
//Отбор БЛИЖАЙШЕЙ фичи от кликнутой фичи.
//https://docs.mapbox.com/help/tutorials/analysis-with-turf/
  
  < script
src = 'https://npmcdn.com/@turf/turf/turf.min.js' > < /script>

map.on('click', function (e) {
  // Выбрали [] всех фич в точке клика, которые принадлежат слою 'libraries'.
  var libraryFeatures = map.queryRenderedFeatures(e.point, {layers: ['libraries']})
  
  if (!libraryFeatures.length) {
    return;
  }
  var libraryFeature = libraryFeatures[0]  //Из [] отобрали конкретную фичу.
  
  
  // === Из фич hospitalsData отобрали ту, которая ближайшая к фиче hospitalsData ===
  var nearestHospital = turf.nearest(libraryFeature, hospitalsData)
  
  
  // Отображаем ближайший госпиталь в отдельном слое.
  map.addSource('nearest-hospital', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []         //сначала создаем ресурс, содержащий пустую Data.
    }
  })
  
  if (nearestHospital !== null) {
    map.getSource('nearest-hospital').setData({     //обновляем ресурс.
      type: 'FeatureCollection',
      features: [nearestHospital]
    })
    
    map.addLayer({         //отображаем ресурс в слое, причем ПОД слоем 'hospitals'.
      id: 'nearest-hospital',
      type: 'circle',
      source: 'nearest-hospital',
      paint: {
        'circle-radius': 12,
        'circle-color': '#486DE0'
      }
    }, 'hospitals')
  }
})

var hospitalsData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {Name: 'VA Medical Center', Address: '2250 Leestown Rd'},
      geometry: {type: 'Point', coordinates: [-84.539487, 38.072916]}
    },
    {
      type: 'Feature',
      properties: {Name: 'St. Joseph East', Address: '150 N Eagle Creek Dr'},
      geometry: {type: 'Point', coordinates: [-84.440434, 37.998757]}
    },
  ]
}






