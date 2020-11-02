
//Добавление Маркера и его ОБРАБОТЧИКА(?) - вроде как еще раз. ))
function createMap() {        //1938
  let map = new mapboxgl.Map()
  
  map.on('style.load', () => {     //2019
  
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




