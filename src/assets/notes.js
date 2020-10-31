
//Добавление Маркера и его ОБРАБОТЧИКА(?) - вроде как еще раз. ))
function createMap() {        //1938
  let map = new mapboxgl.Map()
  
  map.on('style.load', () => {     //2019
    this.addSourceOnMap('cameras', this.cameraFeatures)  //2029
    
    map.on('click', 'cameras', (e) => {     //2057
      //по клику по камере он НЕ срабатывает. ))
    })
  })
}

function addCamerasLayers() {  // эта функция НИГДЕ(!) не используется )).
  map.addLayer({   //прописано в addCamerasLayers() (addCamerasLayers() - это methods(){})
    'id': 'cameras',
    'type': 'symbol',
    'source': 'cameras',
    'filter': ['!has', 'point_count'],
    'layout': {
      'icon-image': '{icon}',
      'icon-allow-overlap': true,
      'icon-rotation-alignment': 'map'
    }
  })
}


//................METHODS
// Универсальные метод для добалевния source для карты
addSourceOnMap: function (sourceName, featureArray) {
  map.addSource(sourceName, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: featureArray
    },
    cluster: true,
    clusterMaxZoom: 20,
    clusterRadius: 50
  });
}


//............... TYPES
features = this.cameraFeatures.filter()

this.cameraFeatures = [
  {
    geometry: {},
    properties: {},
    type: {}
  },
]

function addSourceOnMap(featureArray) {}
addSourceOnMap(this.cameraFeatures)
//т.е. featureArray = this.cameraFeatures




