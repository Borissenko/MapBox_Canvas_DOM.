//слияние маркеров в кружок при изменении zoom.
// используем плагин https://github.com/mapbox/supercluster
import Supercluster from 'supercluster'

const index = new Supercluster({
  radius: 40,
  maxZoom: 16,
  initial: function () {  //initial cluster properties ?
    return {
      status0: 0,
      status1: 0,
      territoryNames: '',
      groupNames: '',
      
      analiticsData: [],
      selectedCount: 0,
      cameraNames: '',
      sum: 0
    }
  },
  map: (props) => {  //returns cluster properties
    return {
      analiticsData: [],
      selectedCount: props.isSelected ? 1 : 0,
      cameraNames: props.name,
      sum: props.myValue
    }
  },
  reduce: (accumulated, props) => { //merges properties of two clusters into one
    accumulated.sum += props.sum
  }
})

//добавляем кластерные ресурсы
map.addSource('camerasSuperCluster', {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: []
    //features: index.getClusters([westLng, southLat, eastLng, northLat], zoom).features
  },
  buffer: 1,
})




index.load(points)
index.getClusters([-180, -85, 180, 85], Math.floor(this.map.getZoom()))  //([westLng, southLat, eastLng, northLat], zoom)





