//state of a feature
// - параметры конкретной фичи, которые прописываются неявно.
//Корысть в ром, что эти параметры можно динамически изменять ПОСЛЕ ОСУЩЕСТВЛЕНИЯ map.addSource({}),
// и они же могут получаться как параметр при декларации элементов слоя с помощью ['feature-state', 'field_name'].


//https://docs.mapbox.com/mapbox-gl-js/api/map/#map#setfeaturestate
//https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/
//https://docs.mapbox.com/help/tutorials/create-interactive-hover-effects-with-mapbox-gl-js/


var hoveredStateId = null;

map.on('load', function () {
  map.addSource('states', {
    'type': 'geojson',
    'data':
      'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
  });

// The feature-state dependent fill-opacity expression will render the hover effect
// when a feature's hover state is set to true.
  map.addLayer({
    'id': 'layerId',
    'type': 'fill',
    'source': 'states',
    'layout': {},
    'paint': {
      'fill-color': '#627BC1',
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],  //false- значение, поставленное для подстраховки, по-умолчанию.
        1,
        0.5
      ]
    }
  });
  
// When the user moves their mouse over the layerId layer, we'll update the
// feature state for the feature under the mouse.

//При наведении на полигон в ресурсе 'states' у feature под мышкой, ориентируясь на ее id = e.features[0].id, добавляем в его 'feature-state' поле "hover" со значением true.
//В результате, согласно декларации 'fill-opacity' в map.addLayer({}), у feature, имеющим в их 'feature-state' поле "hover"=true, прозрачность отрисовывется 1.
  map.on('mousemove', 'layerId', function (e) {
  
    var featuresData = e.features[0].properties   //Доступ к параметрам данной фичи.
    
    if (e.features.length > 0) {
      if (hoveredStateId) {
        map.setFeatureState(
          { source: 'states', id: hoveredStateId },
          { hover: false }
        );
      }
      hoveredStateId = e.features[0].id
      map.setFeatureState(
        { source: 'states', id: hoveredStateId },
        { hover: true }
      );
    }
  });

// When the mouse leaves the layerId layer, update the feature state of the
// previously hovered feature.
  map.on('mouseleave', 'layerId', function () {
    if (hoveredStateId) {
      map.setFeatureState(
        { source: 'states', id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = null;
  });
});