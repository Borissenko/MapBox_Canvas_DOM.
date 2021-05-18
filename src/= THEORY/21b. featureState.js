//setFeatureState



// When the user moves their mouse over the polygonId-layer, we'll update the
// feature state for the feature under the mouse.
//https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/

//изменение параметров слоя при клике
map.addLayer({
  'id': 'polygonId',
  'type': 'fill',
  'source': 'states',
  'layout': {},
  'paint': {
    'fill-color': '#627BC1',
    'fill-opacity': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],   // <<использование feature-state.
      1,
      0.5
    ]
  }
});


var hoveredStateId = null;

map.on('mousemove', 'polygonId', function (e) {
  if (e.features.length > 0) {
    if (hoveredStateId) {
      map.setFeatureState(
        { source: 'states', id: hoveredStateId },
        { hover: false }
      );
    }
    hoveredStateId = e.features[0].id;
    map.setFeatureState(
      { source: 'states', id: hoveredStateId },
      { hover: true }
    );
  }
});

// When the mouse leaves the polygonId-layer, update the feature state of the
// previously hovered feature.
map.on('mouseleave', 'polygonId', function () {
  if (hoveredStateId) {
    map.setFeatureState(
      { source: 'states', id: hoveredStateId },
      { hover: false }
    );
  }
  hoveredStateId = null;
});



// .......................
// https://docs.mapbox.com/mapbox-gl-js/example/hover-styles/











