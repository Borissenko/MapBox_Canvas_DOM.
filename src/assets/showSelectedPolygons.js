//переписка на карте нового полигона

function showSelectedPolygons() {
  
  let globalPolygonsToAdd = {
    "type": "FeatureCollection",
    "features": [
      {
        geometry: {
          coordinates: Array,
          type: "Polygon"
        },
        id: "1261",
        properties: {},
        type: "Feature"
      },
    ]
  }
  
  removeSelectedPolygons('globalPoly');
  
  map.addSource('globalPoly',{
    'type': 'geojson',
    'data': globalPolygonsToAdd
  });
  
  map.addLayer({
    'id': 'globalPoly',
    'type': 'fill',
    'source': 'globalPoly' +
      '',
    'layout': {},
    'paint': {
      'fill-color': '#df50f8',   //'#409EFF'
      'fill-opacity': 0.15
    }
  });
}


let map
function removeSelectedPolygons(typeOfSource) {
  if (map.getLayer(typeOfSource)) map.removeLayer(typeOfSource);
  if (map.getSource(typeOfSource)) map.removeSource(typeOfSource);
}

map = new mapboxgl.Map(
  {
    container: 'map_'+this.mapId,
    style: this.mapServerUrl + 'styles/facecontrol-' + currentStyle + '/style.json?optimize=true',
    // center: [37.618423, 55.751244],
    center: [x_mean, y_mean],
    zoom: 11,
    minZoom: 4,
    hash: false,
    showCompass: true,
  }
)
